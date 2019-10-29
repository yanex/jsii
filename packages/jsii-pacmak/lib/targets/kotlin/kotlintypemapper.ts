import spec = require('jsii-spec');
import reflect = require('jsii-reflect');
import { typeReferenceSpec } from '../../reflect-hacks';
import { KotlinPlatform } from './kotlingeneratorconfiguration';
import { TypeSystem } from 'jsii-reflect';

export class KotlinTypeMapper {
  public static getPackageName(assembly: reflect.Assembly): string | undefined {
    return assembly.targets && assembly.targets.kotlin && assembly.targets.kotlin.package
  }

  public constructor(private readonly platform: KotlinPlatform) {}

  public mapOptional(value: reflect.OptionalValue, isNullable: boolean = value.optional): string {
    const type = this.mapTypeReference(value.type)
    const nullabilityMarker = isNullable ? '?' : ''
    return `${type}${nullabilityMarker}`
  }

  public mapTypeReference(ref: reflect.TypeReference, mapArguments = true): string {
    const specRef = typeReferenceSpec(ref)
    return this.mapSpecTypeReference(specRef, ref.system, mapArguments)
  }

  public mapReferenceType(type: reflect.ReferenceType): string {
    return this.mapReferenceName(type.fqn, type.system)
  }

  private mapSpecTypeReference(ref: spec.TypeReference, system: TypeSystem, mapArguments: boolean): string {
    if (spec.isPrimitiveTypeReference(ref)) {
      return this.mapPrimitiveType(ref.primitive)
    } else if (spec.isCollectionTypeReference(ref)) {
      return this.mapCollectionType(ref, system, mapArguments)
    } else if (spec.isNamedTypeReference(ref)) {
      return this.mapReferenceName(ref.fqn, system)
    } else if (spec.isUnionTypeReference) {
      return this.mapUnionType(ref)
    }

    throw new Error(`Unexpected type reference kind: ${ref}`)
  }

  private mapPrimitiveType(primitive: spec.PrimitiveType): string {
    const platform = this.platform

    function unsupportedPlatform(): never {
      throw new Error(`${primitive} type is unsupported on ${platform}`)
    }

    switch (primitive) {
      case spec.PrimitiveType.Boolean: return 'kotlin.Boolean'
      case spec.PrimitiveType.Number: return 'kotlin.Number'
      case spec.PrimitiveType.String: return 'kotlin.String'
      case spec.PrimitiveType.Any: return 'kotlin.Any'
      case spec.PrimitiveType.Date: {
        switch (platform) {
          case KotlinPlatform.Jvm: return 'java.time.Instant'
          default: return unsupportedPlatform()
        }
      }
      case spec.PrimitiveType.Json: {
        switch (platform) {
          case KotlinPlatform.Jvm: return 'com.fasterxml.jackson.databind.node.ObjectNode'
          default: return unsupportedPlatform()
        }
      }
      default: throw new Error(`Unknown primitive type: ${primitive}`)
    }
  }

  private mapCollectionType(ref: spec.CollectionTypeReference, system: TypeSystem, mapArguments: boolean): string {
    const elementType = this.mapSpecTypeReference(ref.collection.elementtype, system, mapArguments)
    const kind = ref.collection.kind
    switch (kind) {
      case spec.CollectionKind.Array:
        const arrayType = 'kotlin.List'
        return mapArguments ? `${arrayType}<${elementType}>` : arrayType
      case spec.CollectionKind.Map:
        const mapType = 'kotlin.Map'
        return mapArguments ? `${mapType}<kotlin.String, ${elementType}>` : mapType
      default:
        throw new Error(`Unsupported collection kind: ${kind}`)
    }
  }

  private mapReferenceName(fqn: string, system: TypeSystem): string {
    const [assemblyName, ...remainingNameChunks] = fqn.split('.');
    const nameInAssembly = remainingNameChunks.join('.')
    const assembly = system.findAssembly(assemblyName)
    const packageName = KotlinTypeMapper.getPackageName(assembly)
    if (packageName) {
      return `${packageName}.${nameInAssembly}`
    }

    return nameInAssembly
  }

  private mapUnionType(_ref: spec.UnionTypeReference): string {
    // TODO find common supertype
    return 'kotlin.Any'
  }
}