import { KotlinGeneratorConfiguration, KotlinPlatform } from './kotlingeneratorconfiguration';
import { DeclarationNode } from './declarationnode';
import { ClassType, EnumType, InterfaceType, ReferenceType, Property, Method, Parameter, Documentable, Type, EnumMember } from 'jsii-reflect';
import { VERSION_DESC } from '../../version';
import { JvmAbi } from '../jvm/jvmabi';
import { TypeKind, Stability } from 'jsii-spec';
import { KDocBuilder } from './kdocbuilder';
import { KotlinCodeMaker } from './kotlincodemaker';

export function createDeclaration(
  decl: DeclarationNode,
  isTopLevel: boolean
): KTypeDeclaration | undefined {
  const type = decl.type;
  if (!type) {
    return undefined;
  }

  const children = createDeclarations(decl.children);

  if (type instanceof ClassType) {
    return undefined; // TODO
  } else if (type instanceof InterfaceType) {
    return new KInterface(type, children, isTopLevel);
  } else if (type instanceof EnumType) {
    return new KEnum(type, isTopLevel);
  }

  throw new Error(`Unexpected declaration type: ${type}`);
}

function createDeclarations(children: DeclarationNode[]): KDeclaration[] {
  const result = [];
  for (const node of children) {
    const decl = createDeclaration(node, false);

    if (decl) {
      result.push(decl);
    }
  }
  return result;
}

export interface KElement {
  render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration): void;
}

export abstract class KDeclaration implements KElement {
  public constructor(private readonly documentable: Documentable) {}

  abstract render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration): void

  protected renderDocumentation(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const docs = this.documentable.docs.docs
    const builder = new KDocBuilder()
    
    builder.push(docs.summary || docs.default)
    builder.push(docs.remarks)
    builder.push(docs.default, 'Default: ')
    builder.push(docs.example, 'Example: \n')

    builder.push(docs.returns, '@return ')
    builder.push(docs.see, '@see ')

    if (this.documentable instanceof Method) {
      const params = this.documentable.parameters
      for (const param of params) {
        const summary = this.endWithPeriod(param.docs.summary)
        const name = config.namer.propertyName(param.name)
        builder.push(summary, `@param ${name}`)
      }
    }

    builder.render(code)
  }

  private endWithPeriod(text: string | undefined): string | undefined {
    if (!text) {
      return text
    }

    if (!text.endsWith('.') && !text.endsWith('?') && !text.endsWith('!')) {
      return `${text}.`
    }
    return text
  }

  protected renderStabilityAnnotations(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const docs = this.documentable.docs
    if (docs.stability === Stability.Deprecated || docs.deprecated) {
      const reason = docs.deprecationReason || 'Declaration is deprecated.'
      code.line(`@Deprecated(${reason})`)
    }

    if (config.platform === KotlinPlatform.Jvm && docs.stability) {
      const annotationType = JvmAbi.stabilityAnnotationType
      const levelName = JvmAbi.getStabilityLevelName(docs.stability)
      const levelConst = `${annotationType}.Level.${levelName}`
      code.line(`@${annotationType}(${levelConst})`)
    }
  }
}

export abstract class KTypeDeclaration extends KDeclaration {
  public constructor(
    protected readonly type: Type,
    protected readonly isTopLevel: boolean
  ) {
    super(type);
  }

  public get fqn(): string {
    return this.type.fqn;
  }

  protected renderGeneratedAnnotation(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    if (this.isTopLevel && config.platform === KotlinPlatform.Jvm) {
      const annotationName = 'javax.annotation.Generated'
      if (config.fingerprint) {
        const version = `jsii-pacmak/${VERSION_DESC}`
        const date = new Date().toISOString()
        code.line(`@${annotationName}(value = "${version}", date = "${date}")`)
      } else {
        code.line(`@${annotationName}(value = "jsii-pacmak")`)
      }
    }
  }

  protected renderJsiiAnnotation(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const moduleClassName = `${config.packageName}.\`${JvmAbi.moduleName}\``
    const moduleClassLiteral = `${moduleClassName}::class`
    const fqn = this.type.fqn
    code.line(`@${JvmAbi.jsiiAnnotation}(module = ${moduleClassLiteral}, fqn = "${fqn}")`)
  }
}

abstract class KReferenceTypeDeclaration extends KTypeDeclaration {
  public constructor(
    protected readonly type: ReferenceType,
    isTopLevel: boolean
  ) {
    super(type, isTopLevel)
  }

  protected isMutable(property: Property): boolean {
    return !property.immutable
  }

  protected getPropertyModifiers(_property: Property): string[] {
    return []
  }

  protected renderProperties(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    for (const property of properties) {
      const isMutable = this.isMutable(property)
      const modifiers = this.getPropertyModifiers(property)
      new KProperty(property, isMutable, modifiers).render(code, config);
    }
  }
  
  protected renderMethods(methods: Method[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    function body(method: Method) {
      return function(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
        const name = method.name
        const returnType = config.typeMapper.mapTypeReference(method.returns.type)
        const returnTypeLiteral = `${returnType}::class.java`
        const hasArgs = method.parameters.length > 0
        
        if (hasArgs) {
          code.indent('val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(')
          let firstParam = true
          for (const param of method.parameters) {
            const rawName = param.name
            const name = config.namer.propertyName(rawName)
            const comma = firstParam ? '' : ','
            firstParam = false

            if (param.optional) {  
              code.line(`this.${name}${comma}`)
            } else {
              code.line(`this.${name} ?: error("'${rawName}' is required")${comma}`)
            }
          }
          code.unindent(')')
        }

        const argsArg = hasArgs ? ', args' : ''
        code.line(`this.${JvmAbi.jsiiObject.callMethod}("${name}", ${returnTypeLiteral}${argsArg})`)
      }
    }

    for (const method of methods) {
      new KFunction(method, body(method)).render(code, config);
    }
  }

  protected renderProxy(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    if (config.platform === KotlinPlatform.Jvm) {
      const proxy = new KProxyClass(this.type)
      proxy.render(code, config)
    }
  }
}

export class KEnum extends KTypeDeclaration {
  public constructor(private readonly enm: EnumType, isTopLevel: boolean) {
    super(enm, isTopLevel)
  }

  public render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    code.extraLine()
    this.renderGeneratedAnnotation(code, config);
    this.renderDocumentation(code, config)
    this.renderStabilityAnnotations(code, config);

    const name = config.namer.className(this.enm.name)
    code.openBlock(`enum ${name}`)
    for (const member of this.enm.members) {
      const value = new KEnumValue(member)
      value.render(code, config)
      
    }
    code.closeBlock()
  }
}

export class KEnumValue extends KDeclaration {
  public constructor(private readonly value: EnumMember) {
    super(value)
  }

  public render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    code.extraLine()
    this.renderDocumentation(code, config)
    this.renderStabilityAnnotations(code, config)

    const name = config.namer.className(this.value.name)
    code.line(`${name},`)
  }
}

export class KInterface extends KReferenceTypeDeclaration {
  public constructor(
    private readonly intf: InterfaceType, 
    private readonly children: KDeclaration[],
    isTopLevel: boolean
  ) {
    super(intf, isTopLevel);
  }

  public render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const name = config.namer.className(this.intf.name);
    const superTypes = this.getSuperTypeList(config).join(', ');

    const [staticMethods, instanceMethods] = partition(this.intf.ownMethods, m => m.static);
    const [staticProperties, instanceProperties] = partition(this.intf.ownProperties, p => p.static);

    const hasCompanionObject = staticMethods.length > 0 || staticProperties.length > 0;

    code.extraLine()
    this.renderDocumentation(code, config)
    this.renderGeneratedAnnotation(code, config);
    this.renderStabilityAnnotations(code, config);

    code.openBlock(`interface ${name}: ${superTypes}`);
    
    if (hasCompanionObject) {
      const obj = new KCompanionObject(this.intf, staticProperties, staticMethods);
      obj.render(code, config);
    }

    this.renderProperties(instanceProperties, code, config);
    this.renderMethods(instanceMethods, code, config);

    for (const child of this.children) {
      child.render(code, config);
    }

    if (this.intf.datatype) {
      const builder = new KBuilderClass(this.intf)
      builder.render(code, config);
    }

    this.renderProxy(code, config);

    code.closeBlock()
  }

  private getSuperTypeList(config: KotlinGeneratorConfiguration): string[] {
    const result = [];
    if (config.platform === KotlinPlatform.Jvm) {
      result.push('software.amazon.jsii.JsiiSerializable');
    }

    for (const superIntf of this.intf.interfaces) {
      result.push(config.typeMapper.mapReferenceType(superIntf))
    }
    return result
  }
}

export class KBuilderClass extends KReferenceTypeDeclaration {
  public constructor(private readonly intf: InterfaceType) {
    super(intf, false)
  }

  protected isMutable(_property: Property): boolean {
    return true
  }

  public render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const properties = this.intf.allProperties

    code.declarationBlock('class Builder')
    this.renderProperties(properties, code, config)
    this.renderBuild(properties, code, config)
    code.closeBlock()
  }

  private renderBuild(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const selfType = config.typeMapper.mapReferenceType(this.intf)
    code.declarationBlock(`fun build(): ${selfType}`)
    this.renderBuilderLocalAssignments(properties, code, config)
    this.renderProxyConstructorCall(properties, code, config)
    code.closeBlock()
  }

  private renderBuilderLocalAssignments(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    for (const property of properties) {
      const name = config.namer.propertyName(property.name)
      if (property.optional) {
        code.line(`val ${name} = this.${name}`)
      } else {
        code.line(`val ${name} = this.${name} ?: kotlin.error("Value for property '${name}' must be specified")`)
      }
    }
  }
  
  private renderProxyConstructorCall(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const args = properties
      .map(p => config.namer.propertyName(p.name))
      .join(', ')

    code.line(`return \`${JvmAbi.proxyName}\`(${args})`)
  }
}

export class KCompanionObject extends KReferenceTypeDeclaration {
  public constructor(
    type: ReferenceType,
    private readonly properties: Property[], 
    private readonly methods: Method[]
  ) {
    super(type, false)
  }

  public render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    code.declarationBlock('companion object');
    this.renderProperties(this.properties, code, config);
    this.renderMethods(this.methods, code, config);
    code.closeBlock()
  }
}

export class KProxyClass extends KReferenceTypeDeclaration {
  public constructor(type: ReferenceType) {
    super(type, false)
  }

  public render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const selfType = config.typeMapper.mapReferenceType(this.type)
    const superTypes = this.type.kind === TypeKind.Class
      ? selfType
      : `${JvmAbi.jsiiObject.type}, ${selfType}`

    const properties = this.type.allProperties

    code.declarationBlock(`internal class \`${JvmAbi.proxyName}\`: ${superTypes}`)
    
    this.renderProperties(properties, code, config)
    this.renderRefConstructor(properties, code, config)

    if (this.type.isDataType()) {
      this.renderDataConstructor(properties, code, config)
      this.renderDataEquals(properties, code, config)
      this.renderDataHashCode(properties, code, config)
      this.renderDataToJson(properties, code, config)
    } else {
      this.renderMethods(this.type.allMethods, code, config)
    }
    
    code.closeBlock()
  }

  private renderRefConstructor(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const initMode = `${JvmAbi.jsiiObject.initializationMode}.JSII`

    code.declarationBlock(`protected constructor(objRef: ${JvmAbi.jsiiObject.ref}) : super(${initMode})`)
    code.line('this.objRef = objRef')

    for (const property of properties) {
      const rawName = property.name
      const name = config.namer.propertyName(rawName)
      const rawType = config.typeMapper.mapTypeReference(property.type, false)
      const classLiteral = `${rawType}::class.java`
      code.line(`this.${name} = this.${JvmAbi.jsiiObject.callMethod}("${rawName}", ${classLiteral})`)
    }

    code.closeBlock()
  }

  protected getPropertyModifiers(_property: Property): string[] {
    return ['override']
  }

  private renderDataConstructor(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const initMode = `${JvmAbi.jsiiObject.initializationMode}.JSII`
    const params = this.prepareDataConstructorParams(properties, config)

    code.declarationBlock(`constructor(${params}) : super(${initMode})`)

    for (const property of properties) {
      const name = config.namer.propertyName(property.name)
      code.line(`this.${name} = ${name}`)
    }

    code.closeBlock()
  }

  private prepareDataConstructorParams(properties: Property[], config: KotlinGeneratorConfiguration): string {
    const params = []
    for (const property of properties) {
      const name = config.namer.propertyName(property.name)
      const type = config.typeMapper.mapOptional(property)
      params.push(`${name}: ${type}`)
    }
    return params.join(', ')
  }

  private renderDataEquals(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    code.declarationBlock('override fun hashCode(): Int')

    function getHashCode(property: Property) {
      const name = config.namer.propertyName(property.name)
      if (property.optional) {
        return `this.${name}?.hashCode() ?: 0`
      }

      return `this.${name}.hashCode()`
    }

    if (properties.length > 0) {
      const [first, ...remaining] = properties
      code.line(`var result = ${getHashCode(first)}`)
      for (const property of remaining) {
        code.line(`result = 31 * result + (${getHashCode(property)})`)
      }
      code.line('return result')
    } else {
      code.line('return 0')
    }

    code.closeBlock()
  }

  private renderDataHashCode(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    code.declarationBlock('override fun equals(other: Any?)')

    code.line('if (this === other) return true')
    code.line('if (javaClass != other?.javaClass) return false')

    if (properties.length > 0) {
      const selfName = config.typeMapper.mapReferenceType(this.type)
      code.line(`other as ${selfName}`)

      for (const property of properties) {
        const name = config.namer.propertyName(property.name)
        code.line(`if (${name} != other?.${name}) return false`)
      }
    }

    code.line('return true')

    code.closeBlock()
  }

  private renderDataToJson(properties: Property[], code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const methodName = config.namer.methodName(JvmAbi.jsiiObjectMapper.toJsonMethod)

    code.declarationBlock(`override fun ${methodName}(): ${JvmAbi.jackson.jsonNode}`)
    code.line(`val om = ${JvmAbi.jsiiObjectMapper.instance}`)
    code.line(`val obj = ${JvmAbi.jackson.newObjectNode}()`)

    for (const property of properties) {
      const rawName = property.name
      const name = config.namer.propertyName(rawName)
      code.line(`obj["${name}"] = om.valueToTree(this.${name})`)
    }

    code.line('return obj')
    code.closeBlock()
  }
}

export class KFunction extends KDeclaration {
  public constructor(
    private readonly method: Method,
    private readonly body: ((code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) => void) | undefined = undefined
  ) {
    super(method)
  }

  public render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const name = config.namer.methodName(this.method.name);
    const valueParameters = this.prepareValueParameters(config);
    const returnType = this.prepareReturnType(config);
    const text = `fun ${name}(${valueParameters})${returnType}`

    code.extraLine()
    this.renderDocumentation(code, config)
    this.renderStabilityAnnotations(code, config);

    if (this.body) {
      code.openBlock(text);
      this.body(code, config);
      code.closeBlock()
    } else {
      code.line(text)
    }
  }

  private prepareReturnType(config: KotlinGeneratorConfiguration): string | undefined {
    const returns = this.method.returns
    
    if (returns.optional || returns.type.void) {
      return ''
    }

    const type = config.typeMapper.mapTypeReference(returns.type)
    return type ? `: ${type}` : ''
  }

  private prepareValueParameters(config: KotlinGeneratorConfiguration): string {
    const result = [];
    for (const param of this.method.parameters) {
      result.push(this.prepareValueParameter(param, config))
    }
    return result.join(', ');
  }

  private prepareValueParameter(param: Parameter, config: KotlinGeneratorConfiguration): string {
    const name = config.namer.propertyName(param.name);
    const vararg = param.variadic ? 'vararg ' : '';
    const type = config.typeMapper.mapOptional(param)
    return `${vararg}${name}: ${type}`
  }
}

export class KProperty extends KDeclaration {
  public constructor(
    private readonly property: Property,
    private readonly isMutable: boolean,
    private readonly modifiers: string[]
  ) {
    super(property);
  }

  public render(code: KotlinCodeMaker, config: KotlinGeneratorConfiguration) {
    const modifiers = this.prepareModifiers()
    const keyword = this.isMutable ? 'var' : 'val';
    const name = config.namer.propertyName(this.property.name);
    const type = config.typeMapper.mapOptional(this.property);

    code.extraLine()
    this.renderDocumentation(code, config)
    this.renderStabilityAnnotations(code, config);
    code.line(`${modifiers}${keyword} ${name}: ${type}`)
  }

  private prepareModifiers(): string {
    if (this.modifiers.length > 0) {
      const modifiersString = this.modifiers.join(' ')
      return `${modifiersString} `
    }

    return ''
  }
}

function partition<T>(array: T[], predicate: (element: T) => boolean): [T[], T[]] {
  const fst = [];
  const snd = [];
  for (const element of array) {
    if (predicate(element)) {
      fst.push(element);
    } else {
      snd.push(element);
    }
  }
  return [fst, snd];
}