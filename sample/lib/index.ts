export interface IVeryBaseInterface {
    foo(): void;
}

export interface Goo {
    readonly foo: string;
}

export interface VeryBaseProps {
    readonly foo: IVery;
}

export interface IVery {
    hey(): number
    hoo(a: number): number
}

/**
 * A base class.
 */
export abstract class Base {
    /**
     * @returns the name of the class (to verify native type names are created for derived classes).
     */
    public typeName() {
        return (this.constructor as any).name;
    }
}

export interface BaseProps extends VeryBaseProps {
    readonly bar: string;
}

export interface IBaseInterface extends IVeryBaseInterface {
    bar(): void;
}

/**
 * Abstract class which represents a numeric value.
 */
export abstract class Value extends Base {
    /**
     * The value.
     */
    public abstract readonly value: number;

    /**
     * String representation of the value.
     */
    public toString() {
        return this.value.toString();
    }
}

/**
 * The general contract for a concrete number.
 */
export interface IDoublable {
    readonly doubleValue: number;
}

/**
 * Represents a concrete number.
 */
export class Number extends Value implements IDoublable {
    /**
     * Creates a Number object.
     * @param value The number.
     */
    constructor(readonly value: number) {
        super();
    }

    /**
     * The number multiplied by 2.
     */
    get doubleValue() {
        return 2 * this.value;
    }
}

/**
 * Represents an operation on values.
 */
export abstract class Operation extends Value {
    public abstract toString(): string;
}

/**
 * Applies to classes that are considered friendly. These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
export interface IFriendly {
    /**
     * Say hello!
     */
    hello(): string
}

/**
 * This is the first struct we have created in jsii
 */
export interface MyFirstStruct {
    /**
     * A string value
     */
    readonly astring: string

    /**
     * An awesome number value
     */
    readonly anumber: number
    readonly firstOptional?: string[]
}

/**
 * This is a struct with only optional properties.
 */
export interface StructWithOnlyOptionals {
    /**
     * The first optional!
     */
    readonly optional1?: string
    readonly optional2?: number
    readonly optional3?: boolean
}

/**
 * Check that enums from \@scoped packages can be references.
 * See awslabs/jsii#138
 */
export enum EnumFromScopedModule {
    VALUE1,
    VALUE2
}

/**
 * Interface that inherits from packages 2 levels up the tree
 *
 * Their presence validates that .NET/Java/jsii-reflect can track all fields
 * far enough up the tree.
 */
export interface IThreeLevelsInterface extends IBaseInterface {
    baz(): void;
}

/**
 * Even friendlier classes can implement this interface.
 */
export interface IFriendlier extends IFriendly {
    /**
     * Say goodbye.
     * @returns A goodbye blessing.
     */
    goodbye(): string

    /**
     * Say farewell.
     */
    farewell(): string
}

/**
 * Generates random numbers.
 */
export interface IRandomNumberGenerator {
    /**
     * Returns another random number.
     * @returns A random number.
     */
    next(): number
}

export interface IFriendlyRandomGenerator extends IRandomNumberGenerator, IFriendly {

}

/**
 * Represents an operation with two operands.
 */
export abstract class BinaryOperation extends Operation implements IFriendly {
    /**
     * Creates a BinaryOperation
     * @param lhs Left-hand side operand
     * @param rhs Right-hand side operand
     */
    constructor(readonly lhs: Value, readonly rhs: Value) {
        super();
    }

    hello() {
        return 'Hello, I am a binary operation. What\'s your name?';
    }
}

/**
 * The "+" binary operation.
 */
export class Add extends BinaryOperation {
    get value() {
        return this.lhs.value + this.rhs.value;
    }

    toString() {
        return `(${this.lhs} + ${this.rhs})`
    }
}

/**
 * The "*" binary operation.
 */
export class Multiply extends BinaryOperation implements IFriendlier, IRandomNumberGenerator {
    get value() {
        return this.lhs.value * this.rhs.value;
    }

    toString() {
        return `(${this.lhs} * ${this.rhs})`
    }

    goodbye() {
        return 'Goodbye from Multiply!';
    }

    farewell() {
        return 'Farewell to you too!';
    }

    next() {
        return 89;
    }
}

/**
 * An operation on a single operand.
 */
export abstract class UnaryOperation extends Operation {
    constructor(readonly operand: Value) {
        super();
    }
}

/**
 * The negation operation ("-value")
 */
export class Negate extends UnaryOperation implements IFriendlier {
    get value() {
        return -1 * this.operand.value;
    }

    toString() {
        return `-${this.operand}`;
    }

    hello() {
        return 'I know I am called Negate, but I am friendly';
    }

    goodbye() {
        return 'See you friend';
    }

    farewell() {
        return this.goodbye() + ', oh farewell!';
    }
}

/**
 * Utilities for composing multiple operations.
 */
export namespace composition {
    /**
     * Abstract operation composed from an expression of other operations.
     */
    export abstract class CompositeOperation extends Operation {
        /**
         * The .toString() style.
         */
        public stringStyle = CompositeOperation.CompositionStringStyle.NORMAL

        /**
         * A set of prefixes to include in a decorated .toString().
         */
        public decorationPrefixes = [ '<<[[{{' ]

        /**
         * A set of postfixes to include in a decorated .toString().
         */
        public decorationPostfixes = [ '}}]]>>' ];

        get value() {
            return this.expression.value;
        }

        /**
         * The expression that this operation consists of.
         * Must be implemented by derived classes.
         */
        abstract readonly expression: Value;

        toString() {
            switch (this.stringStyle) {
                case CompositeOperation.CompositionStringStyle.NORMAL:
                    return this.expression.toString();
                case CompositeOperation.CompositionStringStyle.DECORATED:
                    return this.decorationPrefixes.join('') + this.expression.toString() + this.decorationPostfixes.join('');
                default:
                    throw new Error(`Unknown string style: ${this.stringStyle}`);
            }
        }
    }

    export namespace CompositeOperation {
        /**
         * Style of .toString() output for CompositeOperation.
         */
        export enum CompositionStringStyle {
            /** Normal string expression */
            NORMAL,

            /** Decorated string expression */
            DECORATED
        }
    }
}

/**
 * An operation that sums multiple values.
 */
export class Sum extends composition.CompositeOperation {

    /**
     * The parts to sum.
     */
    parts: Value[] = [];

    // TODO: some annoying bug in Nashorn will throw this exception if
    // call that prototype's ctor via "apply" instead: java.lang.AssertionError: duplicate code
    constructor() {
        super();
    }

    get expression() {
        let curr: Value = new Number(0);
        for (let part of this.parts) {
            curr = new Add(curr, part);
        }
        return curr;
    }
}

/**
 * The power operation.
 */
export class Power extends composition.CompositeOperation {

    /**
     * Creates a Power operation.
     * @param base The base of the power
     * @param pow The number of times to multiply
     */
    constructor(readonly base: Value, readonly pow: Value) {
        super();
    }

    get expression(): Value {
        let curr: Operation = new Number(1);
        for (let i = 0; i < this.pow.value; ++i) {
            curr = new Multiply(curr, this.base);
        }
        return curr;
    }
}

/**
 * Properties for Calculator.
 */
export interface CalculatorProps {
    readonly initialValue?: number
    readonly maximumValue?: number
}

/**
 * A calculator which maintains a current value and allows adding operations.
 */
export class Calculator extends composition.CompositeOperation {

    /**
     * Creates a Calculator object.
     * @param props Initialization properties.
     */
    constructor(props?: CalculatorProps) {
        super();

        props = props || { };

        const initialValue = props.initialValue ? props.initialValue : 0;
        this.curr = new Number(initialValue);
        this.maxValue = props.maximumValue;
    }

    /**
     * The current value.
     */
    public curr: Value

    /**
     * A map of per operation name of all operations performed.
     */
    public readonly operationsMap: { [op: string]: Value[] } = { }

    /**
     * A log of all operations.
     */
    public readonly operationsLog = new Array<Value>();

    /**
     * The maximum value allows in this calculator.
     */
    public maxValue?: number

    /**
     * Adds a number to the current value.
     */
    public add(value: number) {
        this.addOperation('add', new Add(this.curr, new Number(value)));
    }

    /**
     * Multiplies the current value by a number.
     */
    public mul(value: number) {
        this.addOperation('mul', new Multiply(this.curr, new Number(value)));
    }

    /**
     * Raises the current value by a power.
     */
    public pow(value: number) {
        this.addOperation('pow', new Power(this.curr, new Number(value)));
    }

    /**
     * Negates the current value.
     */
    public neg() {
        this.addOperation('neg', new Negate(this.curr));
    }

    /**
     * Returns the expression.
     */
    get expression() {
        return this.curr;
    }

    /**
     * Example of a property that accepts a union of types.
     */
    public unionProperty?: Add | Multiply | Power

    /**
     * Returns teh value of the union property (if defined).
     */
    public readUnionValue() {
        if (!this.unionProperty) {
            return 0;
        }

        return this.unionProperty.value;
    }

    private addOperation(op: string, value: Value) {
        if (this.maxValue && value.value > this.maxValue) {
            throw new Error(`Operation ${value} exceeded maximum value ${this.maxValue}`);
        }

        let list = this.operationsMap[op];
        if (!list) {
            list = new Array<Value>();
            this.operationsMap[op] = list;
        }
        list.push(value);

        this.operationsLog.push(value);
        this.curr = value;
    }
}

/**
 * Here's the first line of the TSDoc comment.
 *
 * This is the meat of the TSDoc comment. It may contain
 * multiple lines and multiple paragraphs.
 *
 * Multiple paragraphs are separated by an empty line.
 *
 * @stable
 */
export class DocumentedClass {

  /**
   * Greet the indicated person.
   *
   * This will print out a friendly greeting intended for
   * the indicated person.
   *
   * @param greetee The person to be greeted.
   * @returns A number that everyone knows very well
   */
  public greet(greetee: Greetee = {}) {
    process.stdout.write(`Hello, ${greetee.name || 'world'}\n`);
    return 42;
  }

  /**
   * Say ¡Hola!
   *
   * @experimental
   */
  public hola() {
    process.stdout.write('bonjour');
  }
}

/**
 * These are some arguments you can pass to a method.
 */
export interface Greetee {
  /**
   * The name of the greetee
   *
   * @default world
   */
  readonly name?: string;
}

/**
 * Old class
 *
 * @deprecated Use the new class
 */
export class Old {
  /**
   * Doo wop that thing
   */
  public doAThing() {
    // Nothing to do
  }
}

//
// Un-exported base classes are erased
// https://github.com/aws/jsii/issues/417
//
class JSII417PrivateRoot {
  public readonly hasRoot = true;
}
export class JSII417PublicBaseOfBase extends JSII417PrivateRoot {
  public static makeInstance(): JSII417PublicBaseOfBase {
    return new JSII417PrivateBase("TEST");
  }
  public foo() { return; }
}
class JSII417PrivateBase extends JSII417PublicBaseOfBase {
  constructor(protected readonly property: string) {
    super();
  }
  public bar() { return; }
}
export class JSII417Derived extends JSII417PrivateBase {
  public bar() {
    return super.bar();
  }
  public baz() { return; }
}
// Same thing with interfaces
interface IJSII417PrivateRoot {
  readonly hasRoot: boolean;
}
export interface IJSII417PublicBaseOfBase extends IJSII417PrivateRoot {
  foo(): void;
}
interface IJSII417PrivateBase extends IJSII417PublicBaseOfBase {
  readonly property: string;
  bar(): void;
}
export interface IJSII417Derived extends IJSII417PrivateBase {
  baz(): void;
}

//
// Interfaces should be copied from erased classes to public classes
// https://github.com/aws/jsii/issues/487
//
export interface IJsii487External { }
export interface IJsii487External2 { }
class Jsii487Internal implements IJsii487External { }
export class Jsii487Derived extends Jsii487Internal implements IJsii487External2 { }

//
// Deduplicate interfaces that come from different declaration sites
// https://github.com/aws/jsii/issues/496
//
export interface IJsii496 { }
class Jsii496Base implements IJsii496 { }
export class Jsii496Derived extends Jsii496Base implements IJsii496 { }

// The following tests validate emission of stability markers

/** @experimental */
export interface ExperimentalStruct {
  /** @experimental */
  readonly readonlyProperty: string;
}
/** @experimental */
export interface IExperimentalInterface {
  /** @experimental */
  mutableProperty?: number;
  /** @experimental */
  method(): void;
}
/** @experimental */
export class ExperimentalClass {
  /** @experimental */
  public readonly readonlyProperty: string;
  /** @experimental */
  public mutableProperty?: number;
  /** @experimental */
  constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }

  /** @experimental */
  public method(): void { return; }
}
/** @experimental */
export enum ExperimentalEnum {
  /** @experimental */
  OPTION_A,
  /** @experimental */
  OPTION_B
}

/** @stable */
export interface StableStruct {
  /** @stable */
  readonly readonlyProperty: string;
}
/** @stable */
export interface IStableInterface {
  /** @stable */
  mutableProperty?: number;
  /** @stable */
  method(): void;
}
/** @stable */
export class StableClass {
  /** @stable */
  public readonly readonlyProperty: string = 'wazoo';
  /** @stable */
  public mutableProperty?: number;
  /** @stable */
  constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }
  /** @stable */
  public method(): void { return; }
}
/** @stable */
export enum StableEnum {
  /** @stable */
  OPTION_A,
  /** @stable */
  OPTION_B
}

/** @deprecated it just wraps a string */
export interface DeprecatedStruct {
  /** @deprecated well, yeah */
  readonly readonlyProperty: string;
}
/** @deprecated useless interface */
export interface IDeprecatedInterface {
  /** @deprecated could be better */
  mutableProperty?: number;
  /** @deprecated services no purpose */
  method(): void;
}
/** @deprecated a pretty boring class */
export class DeprecatedClass {
  /** @deprecated this is not always "wazoo", be ready to be disappointed */
  public readonly readonlyProperty: string;
  /** @deprecated shouldn't have been mutable */
  public mutableProperty?: number;
  /** @deprecated this constructor is "just" okay */
  constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }
  /** @deprecated it was a bad idea */
  public method(): void { return; }
}
/** @deprecated your deprecated selection of bad options */
export enum DeprecatedEnum {
  /** @deprecated option A is not great */
  OPTION_A,
  /** @deprecated option B is kinda bad, too */
  OPTION_B
}