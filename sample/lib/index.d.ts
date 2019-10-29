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
    hey(): number;
    hoo(a: number): number;
}
/**
 * A base class.
 */
export declare abstract class Base {
    /**
     * @returns the name of the class (to verify native type names are created for derived classes).
     */
    typeName(): any;
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
export declare abstract class Value extends Base {
    /**
     * The value.
     */
    abstract readonly value: number;
    /**
     * String representation of the value.
     */
    toString(): string;
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
export declare class Number extends Value implements IDoublable {
    readonly value: number;
    /**
     * Creates a Number object.
     * @param value The number.
     */
    constructor(value: number);
    /**
     * The number multiplied by 2.
     */
    readonly doubleValue: number;
}
/**
 * Represents an operation on values.
 */
export declare abstract class Operation extends Value {
    abstract toString(): string;
}
/**
 * Applies to classes that are considered friendly. These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
export interface IFriendly {
    /**
     * Say hello!
     */
    hello(): string;
}
/**
 * This is the first struct we have created in jsii
 */
export interface MyFirstStruct {
    /**
     * A string value
     */
    readonly astring: string;
    /**
     * An awesome number value
     */
    readonly anumber: number;
    readonly firstOptional?: string[];
}
/**
 * This is a struct with only optional properties.
 */
export interface StructWithOnlyOptionals {
    /**
     * The first optional!
     */
    readonly optional1?: string;
    readonly optional2?: number;
    readonly optional3?: boolean;
}
/**
 * Check that enums from \@scoped packages can be references.
 * See awslabs/jsii#138
 */
export declare enum EnumFromScopedModule {
    VALUE1 = 0,
    VALUE2 = 1
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
    goodbye(): string;
    /**
     * Say farewell.
     */
    farewell(): string;
}
/**
 * Generates random numbers.
 */
export interface IRandomNumberGenerator {
    /**
     * Returns another random number.
     * @returns A random number.
     */
    next(): number;
}
export interface IFriendlyRandomGenerator extends IRandomNumberGenerator, IFriendly {
}
/**
 * Represents an operation with two operands.
 */
export declare abstract class BinaryOperation extends Operation implements IFriendly {
    readonly lhs: Value;
    readonly rhs: Value;
    /**
     * Creates a BinaryOperation
     * @param lhs Left-hand side operand
     * @param rhs Right-hand side operand
     */
    constructor(lhs: Value, rhs: Value);
    hello(): string;
}
/**
 * The "+" binary operation.
 */
export declare class Add extends BinaryOperation {
    readonly value: number;
    toString(): string;
}
/**
 * The "*" binary operation.
 */
export declare class Multiply extends BinaryOperation implements IFriendlier, IRandomNumberGenerator {
    readonly value: number;
    toString(): string;
    goodbye(): string;
    farewell(): string;
    next(): number;
}
/**
 * An operation on a single operand.
 */
export declare abstract class UnaryOperation extends Operation {
    readonly operand: Value;
    constructor(operand: Value);
}
/**
 * The negation operation ("-value")
 */
export declare class Negate extends UnaryOperation implements IFriendlier {
    readonly value: number;
    toString(): string;
    hello(): string;
    goodbye(): string;
    farewell(): string;
}
/**
 * Utilities for composing multiple operations.
 */
export declare namespace composition {
    /**
     * Abstract operation composed from an expression of other operations.
     */
    abstract class CompositeOperation extends Operation {
        /**
         * The .toString() style.
         */
        stringStyle: CompositeOperation.CompositionStringStyle;
        /**
         * A set of prefixes to include in a decorated .toString().
         */
        decorationPrefixes: string[];
        /**
         * A set of postfixes to include in a decorated .toString().
         */
        decorationPostfixes: string[];
        readonly value: number;
        /**
         * The expression that this operation consists of.
         * Must be implemented by derived classes.
         */
        abstract readonly expression: Value;
        toString(): string;
    }
    namespace CompositeOperation {
        /**
         * Style of .toString() output for CompositeOperation.
         */
        enum CompositionStringStyle {
            /** Normal string expression */
            NORMAL = 0,
            /** Decorated string expression */
            DECORATED = 1
        }
    }
}
/**
 * An operation that sums multiple values.
 */
export declare class Sum extends composition.CompositeOperation {
    /**
     * The parts to sum.
     */
    parts: Value[];
    constructor();
    readonly expression: Value;
}
/**
 * The power operation.
 */
export declare class Power extends composition.CompositeOperation {
    readonly base: Value;
    readonly pow: Value;
    /**
     * Creates a Power operation.
     * @param base The base of the power
     * @param pow The number of times to multiply
     */
    constructor(base: Value, pow: Value);
    readonly expression: Value;
}
/**
 * Properties for Calculator.
 */
export interface CalculatorProps {
    readonly initialValue?: number;
    readonly maximumValue?: number;
}
/**
 * A calculator which maintains a current value and allows adding operations.
 */
export declare class Calculator extends composition.CompositeOperation {
    /**
     * Creates a Calculator object.
     * @param props Initialization properties.
     */
    constructor(props?: CalculatorProps);
    /**
     * The current value.
     */
    curr: Value;
    /**
     * A map of per operation name of all operations performed.
     */
    readonly operationsMap: {
        [op: string]: Value[];
    };
    /**
     * A log of all operations.
     */
    readonly operationsLog: Value[];
    /**
     * The maximum value allows in this calculator.
     */
    maxValue?: number;
    /**
     * Adds a number to the current value.
     */
    add(value: number): void;
    /**
     * Multiplies the current value by a number.
     */
    mul(value: number): void;
    /**
     * Raises the current value by a power.
     */
    pow(value: number): void;
    /**
     * Negates the current value.
     */
    neg(): void;
    /**
     * Returns the expression.
     */
    readonly expression: Value;
    /**
     * Example of a property that accepts a union of types.
     */
    unionProperty?: Add | Multiply | Power;
    /**
     * Returns teh value of the union property (if defined).
     */
    readUnionValue(): number;
    private addOperation;
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
export declare class DocumentedClass {
    /**
     * Greet the indicated person.
     *
     * This will print out a friendly greeting intended for
     * the indicated person.
     *
     * @param greetee The person to be greeted.
     * @returns A number that everyone knows very well
     */
    greet(greetee?: Greetee): number;
    /**
     * Say ¡Hola!
     *
     * @experimental
     */
    hola(): void;
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
export declare class Old {
    /**
     * Doo wop that thing
     */
    doAThing(): void;
}
declare class JSII417PrivateRoot {
    readonly hasRoot = true;
}
export declare class JSII417PublicBaseOfBase extends JSII417PrivateRoot {
    static makeInstance(): JSII417PublicBaseOfBase;
    foo(): void;
}
declare class JSII417PrivateBase extends JSII417PublicBaseOfBase {
    protected readonly property: string;
    constructor(property: string);
    bar(): void;
}
export declare class JSII417Derived extends JSII417PrivateBase {
    bar(): void;
    baz(): void;
}
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
export interface IJsii487External {
}
export interface IJsii487External2 {
}
declare class Jsii487Internal implements IJsii487External {
}
export declare class Jsii487Derived extends Jsii487Internal implements IJsii487External2 {
}
export interface IJsii496 {
}
declare class Jsii496Base implements IJsii496 {
}
export declare class Jsii496Derived extends Jsii496Base implements IJsii496 {
}
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
export declare class ExperimentalClass {
    /** @experimental */
    readonly readonlyProperty: string;
    /** @experimental */
    mutableProperty?: number;
    /** @experimental */
    constructor(readonlyString: string, mutableNumber?: number);
    /** @experimental */
    method(): void;
}
/** @experimental */
export declare enum ExperimentalEnum {
    /** @experimental */
    OPTION_A = 0,
    /** @experimental */
    OPTION_B = 1
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
export declare class StableClass {
    /** @stable */
    readonly readonlyProperty: string;
    /** @stable */
    mutableProperty?: number;
    /** @stable */
    constructor(readonlyString: string, mutableNumber?: number);
    /** @stable */
    method(): void;
}
/** @stable */
export declare enum StableEnum {
    /** @stable */
    OPTION_A = 0,
    /** @stable */
    OPTION_B = 1
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
export declare class DeprecatedClass {
    /** @deprecated this is not always "wazoo", be ready to be disappointed */
    readonly readonlyProperty: string;
    /** @deprecated shouldn't have been mutable */
    mutableProperty?: number;
    /** @deprecated this constructor is "just" okay */
    constructor(readonlyString: string, mutableNumber?: number);
    /** @deprecated it was a bad idea */
    method(): void;
}
/** @deprecated your deprecated selection of bad options */
export declare enum DeprecatedEnum {
    /** @deprecated option A is not great */
    OPTION_A = 0,
    /** @deprecated option B is kinda bad, too */
    OPTION_B = 1
}
export {};
