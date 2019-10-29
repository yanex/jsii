"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A base class.
 */
class Base {
    /**
     * @returns the name of the class (to verify native type names are created for derived classes).
     */
    typeName() {
        return this.constructor.name;
    }
}
exports.Base = Base;
/**
 * Abstract class which represents a numeric value.
 */
class Value extends Base {
    /**
     * String representation of the value.
     */
    toString() {
        return this.value.toString();
    }
}
exports.Value = Value;
/**
 * Represents a concrete number.
 */
class Number extends Value {
    /**
     * Creates a Number object.
     * @param value The number.
     */
    constructor(value) {
        super();
        this.value = value;
    }
    /**
     * The number multiplied by 2.
     */
    get doubleValue() {
        return 2 * this.value;
    }
}
exports.Number = Number;
/**
 * Represents an operation on values.
 */
class Operation extends Value {
}
exports.Operation = Operation;
/**
 * Check that enums from \@scoped packages can be references.
 * See awslabs/jsii#138
 */
var EnumFromScopedModule;
(function (EnumFromScopedModule) {
    EnumFromScopedModule[EnumFromScopedModule["VALUE1"] = 0] = "VALUE1";
    EnumFromScopedModule[EnumFromScopedModule["VALUE2"] = 1] = "VALUE2";
})(EnumFromScopedModule = exports.EnumFromScopedModule || (exports.EnumFromScopedModule = {}));
/**
 * Represents an operation with two operands.
 */
class BinaryOperation extends Operation {
    /**
     * Creates a BinaryOperation
     * @param lhs Left-hand side operand
     * @param rhs Right-hand side operand
     */
    constructor(lhs, rhs) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }
    hello() {
        return 'Hello, I am a binary operation. What\'s your name?';
    }
}
exports.BinaryOperation = BinaryOperation;
/**
 * The "+" binary operation.
 */
class Add extends BinaryOperation {
    get value() {
        return this.lhs.value + this.rhs.value;
    }
    toString() {
        return `(${this.lhs} + ${this.rhs})`;
    }
}
exports.Add = Add;
/**
 * The "*" binary operation.
 */
class Multiply extends BinaryOperation {
    get value() {
        return this.lhs.value * this.rhs.value;
    }
    toString() {
        return `(${this.lhs} * ${this.rhs})`;
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
exports.Multiply = Multiply;
/**
 * An operation on a single operand.
 */
class UnaryOperation extends Operation {
    constructor(operand) {
        super();
        this.operand = operand;
    }
}
exports.UnaryOperation = UnaryOperation;
/**
 * The negation operation ("-value")
 */
class Negate extends UnaryOperation {
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
exports.Negate = Negate;
/**
 * Utilities for composing multiple operations.
 */
var composition;
(function (composition) {
    /**
     * Abstract operation composed from an expression of other operations.
     */
    class CompositeOperation extends Operation {
        constructor() {
            super(...arguments);
            /**
             * The .toString() style.
             */
            this.stringStyle = CompositeOperation.CompositionStringStyle.NORMAL;
            /**
             * A set of prefixes to include in a decorated .toString().
             */
            this.decorationPrefixes = ['<<[[{{'];
            /**
             * A set of postfixes to include in a decorated .toString().
             */
            this.decorationPostfixes = ['}}]]>>'];
        }
        get value() {
            return this.expression.value;
        }
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
    composition.CompositeOperation = CompositeOperation;
    (function (CompositeOperation) {
        /**
         * Style of .toString() output for CompositeOperation.
         */
        let CompositionStringStyle;
        (function (CompositionStringStyle) {
            /** Normal string expression */
            CompositionStringStyle[CompositionStringStyle["NORMAL"] = 0] = "NORMAL";
            /** Decorated string expression */
            CompositionStringStyle[CompositionStringStyle["DECORATED"] = 1] = "DECORATED";
        })(CompositionStringStyle = CompositeOperation.CompositionStringStyle || (CompositeOperation.CompositionStringStyle = {}));
    })(CompositeOperation = composition.CompositeOperation || (composition.CompositeOperation = {}));
})(composition = exports.composition || (exports.composition = {}));
/**
 * An operation that sums multiple values.
 */
class Sum extends composition.CompositeOperation {
    // TODO: some annoying bug in Nashorn will throw this exception if
    // call that prototype's ctor via "apply" instead: java.lang.AssertionError: duplicate code
    constructor() {
        super();
        /**
         * The parts to sum.
         */
        this.parts = [];
    }
    get expression() {
        let curr = new Number(0);
        for (let part of this.parts) {
            curr = new Add(curr, part);
        }
        return curr;
    }
}
exports.Sum = Sum;
/**
 * The power operation.
 */
class Power extends composition.CompositeOperation {
    /**
     * Creates a Power operation.
     * @param base The base of the power
     * @param pow The number of times to multiply
     */
    constructor(base, pow) {
        super();
        this.base = base;
        this.pow = pow;
    }
    get expression() {
        let curr = new Number(1);
        for (let i = 0; i < this.pow.value; ++i) {
            curr = new Multiply(curr, this.base);
        }
        return curr;
    }
}
exports.Power = Power;
/**
 * A calculator which maintains a current value and allows adding operations.
 */
class Calculator extends composition.CompositeOperation {
    /**
     * Creates a Calculator object.
     * @param props Initialization properties.
     */
    constructor(props) {
        super();
        /**
         * A map of per operation name of all operations performed.
         */
        this.operationsMap = {};
        /**
         * A log of all operations.
         */
        this.operationsLog = new Array();
        props = props || {};
        const initialValue = props.initialValue ? props.initialValue : 0;
        this.curr = new Number(initialValue);
        this.maxValue = props.maximumValue;
    }
    /**
     * Adds a number to the current value.
     */
    add(value) {
        this.addOperation('add', new Add(this.curr, new Number(value)));
    }
    /**
     * Multiplies the current value by a number.
     */
    mul(value) {
        this.addOperation('mul', new Multiply(this.curr, new Number(value)));
    }
    /**
     * Raises the current value by a power.
     */
    pow(value) {
        this.addOperation('pow', new Power(this.curr, new Number(value)));
    }
    /**
     * Negates the current value.
     */
    neg() {
        this.addOperation('neg', new Negate(this.curr));
    }
    /**
     * Returns the expression.
     */
    get expression() {
        return this.curr;
    }
    /**
     * Returns teh value of the union property (if defined).
     */
    readUnionValue() {
        if (!this.unionProperty) {
            return 0;
        }
        return this.unionProperty.value;
    }
    addOperation(op, value) {
        if (this.maxValue && value.value > this.maxValue) {
            throw new Error(`Operation ${value} exceeded maximum value ${this.maxValue}`);
        }
        let list = this.operationsMap[op];
        if (!list) {
            list = new Array();
            this.operationsMap[op] = list;
        }
        list.push(value);
        this.operationsLog.push(value);
        this.curr = value;
    }
}
exports.Calculator = Calculator;
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
class DocumentedClass {
    /**
     * Greet the indicated person.
     *
     * This will print out a friendly greeting intended for
     * the indicated person.
     *
     * @param greetee The person to be greeted.
     * @returns A number that everyone knows very well
     */
    greet(greetee = {}) {
        process.stdout.write(`Hello, ${greetee.name || 'world'}\n`);
        return 42;
    }
    /**
     * Say ¡Hola!
     *
     * @experimental
     */
    hola() {
        process.stdout.write('bonjour');
    }
}
exports.DocumentedClass = DocumentedClass;
/**
 * Old class
 *
 * @deprecated Use the new class
 */
class Old {
    /**
     * Doo wop that thing
     */
    doAThing() {
        // Nothing to do
    }
}
exports.Old = Old;
//
// Un-exported base classes are erased
// https://github.com/aws/jsii/issues/417
//
class JSII417PrivateRoot {
    constructor() {
        this.hasRoot = true;
    }
}
class JSII417PublicBaseOfBase extends JSII417PrivateRoot {
    static makeInstance() {
        return new JSII417PrivateBase("TEST");
    }
    foo() { return; }
}
exports.JSII417PublicBaseOfBase = JSII417PublicBaseOfBase;
class JSII417PrivateBase extends JSII417PublicBaseOfBase {
    constructor(property) {
        super();
        this.property = property;
    }
    bar() { return; }
}
class JSII417Derived extends JSII417PrivateBase {
    bar() {
        return super.bar();
    }
    baz() { return; }
}
exports.JSII417Derived = JSII417Derived;
class Jsii487Internal {
}
class Jsii487Derived extends Jsii487Internal {
}
exports.Jsii487Derived = Jsii487Derived;
class Jsii496Base {
}
class Jsii496Derived extends Jsii496Base {
}
exports.Jsii496Derived = Jsii496Derived;
/** @experimental */
class ExperimentalClass {
    /** @experimental */
    constructor(readonlyString, mutableNumber) {
        this.readonlyProperty = readonlyString;
        this.mutableProperty = mutableNumber;
    }
    /** @experimental */
    method() { return; }
}
exports.ExperimentalClass = ExperimentalClass;
/** @experimental */
var ExperimentalEnum;
(function (ExperimentalEnum) {
    /** @experimental */
    ExperimentalEnum[ExperimentalEnum["OPTION_A"] = 0] = "OPTION_A";
    /** @experimental */
    ExperimentalEnum[ExperimentalEnum["OPTION_B"] = 1] = "OPTION_B";
})(ExperimentalEnum = exports.ExperimentalEnum || (exports.ExperimentalEnum = {}));
/** @stable */
class StableClass {
    /** @stable */
    constructor(readonlyString, mutableNumber) {
        /** @stable */
        this.readonlyProperty = 'wazoo';
        this.readonlyProperty = readonlyString;
        this.mutableProperty = mutableNumber;
    }
    /** @stable */
    method() { return; }
}
exports.StableClass = StableClass;
/** @stable */
var StableEnum;
(function (StableEnum) {
    /** @stable */
    StableEnum[StableEnum["OPTION_A"] = 0] = "OPTION_A";
    /** @stable */
    StableEnum[StableEnum["OPTION_B"] = 1] = "OPTION_B";
})(StableEnum = exports.StableEnum || (exports.StableEnum = {}));
/** @deprecated a pretty boring class */
class DeprecatedClass {
    /** @deprecated this constructor is "just" okay */
    constructor(readonlyString, mutableNumber) {
        this.readonlyProperty = readonlyString;
        this.mutableProperty = mutableNumber;
    }
    /** @deprecated it was a bad idea */
    method() { return; }
}
exports.DeprecatedClass = DeprecatedClass;
/** @deprecated your deprecated selection of bad options */
var DeprecatedEnum;
(function (DeprecatedEnum) {
    /** @deprecated option A is not great */
    DeprecatedEnum[DeprecatedEnum["OPTION_A"] = 0] = "OPTION_A";
    /** @deprecated option B is kinda bad, too */
    DeprecatedEnum[DeprecatedEnum["OPTION_B"] = 1] = "OPTION_B";
})(DeprecatedEnum = exports.DeprecatedEnum || (exports.DeprecatedEnum = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWlCQTs7R0FFRztBQUNILE1BQXNCLElBQUk7SUFDdEI7O09BRUc7SUFDSSxRQUFRO1FBQ1gsT0FBUSxJQUFJLENBQUMsV0FBbUIsQ0FBQyxJQUFJLENBQUM7SUFDMUMsQ0FBQztDQUNKO0FBUEQsb0JBT0M7QUFVRDs7R0FFRztBQUNILE1BQXNCLEtBQU0sU0FBUSxJQUFJO0lBTXBDOztPQUVHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBQ0o7QUFaRCxzQkFZQztBQVNEOztHQUVHO0FBQ0gsTUFBYSxNQUFPLFNBQVEsS0FBSztJQUM3Qjs7O09BR0c7SUFDSCxZQUFxQixLQUFhO1FBQzlCLEtBQUssRUFBRSxDQUFDO1FBRFMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUVsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFdBQVc7UUFDWCxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7Q0FDSjtBQWZELHdCQWVDO0FBRUQ7O0dBRUc7QUFDSCxNQUFzQixTQUFVLFNBQVEsS0FBSztDQUU1QztBQUZELDhCQUVDO0FBeUNEOzs7R0FHRztBQUNILElBQVksb0JBR1g7QUFIRCxXQUFZLG9CQUFvQjtJQUM1QixtRUFBTSxDQUFBO0lBQ04sbUVBQU0sQ0FBQTtBQUNWLENBQUMsRUFIVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQUcvQjtBQTJDRDs7R0FFRztBQUNILE1BQXNCLGVBQWdCLFNBQVEsU0FBUztJQUNuRDs7OztPQUlHO0lBQ0gsWUFBcUIsR0FBVSxFQUFXLEdBQVU7UUFDaEQsS0FBSyxFQUFFLENBQUM7UUFEUyxRQUFHLEdBQUgsR0FBRyxDQUFPO1FBQVcsUUFBRyxHQUFILEdBQUcsQ0FBTztJQUVw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QUN2QyxDQUFDO0lBQ0QsY0FBYztJQUNQLE1BQU0sS0FBVyxPQUFPLENBQUMsQ0FBQztDQUNsQztBQVpELGtDQVlDO0FBQ0QsY0FBYztBQUNkLElBQVksVUFLWDtBQUxELFdBQVksVUFBVTtJQUNwQixjQUFjO0lBQ2QsbURBQVEsQ0FBQTtJQUNSLGNBQWM7SUFDZCxtREFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUxXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBS3JCO0FBY0Qsd0NBQXdDO0FBQ3hDLE1BQWEsZUFBZTtJQUsxQixrREFBa0Q7SUFDbEQsWUFBWSxjQUFzQixFQUFFLGFBQXNCO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUNELG9DQUFvQztJQUM3QixNQUFNLEtBQVcsT0FBTyxDQUFDLENBQUM7Q0FDbEM7QUFaRCwwQ0FZQztBQUNELDJEQUEyRDtBQUMzRCxJQUFZLGNBS1g7QUFMRCxXQUFZLGNBQWM7SUFDeEIsd0NBQXdDO0lBQ3hDLDJEQUFRLENBQUE7SUFDUiw2Q0FBNkM7SUFDN0MsMkRBQVEsQ0FBQTtBQUNWLENBQUMsRUFMVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUt6QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSVZlcnlCYXNlSW50ZXJmYWNlIHtcbiAgICBmb28oKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHb28ge1xuICAgIHJlYWRvbmx5IGZvbzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnlCYXNlUHJvcHMge1xuICAgIHJlYWRvbmx5IGZvbzogSVZlcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZlcnkge1xuICAgIGhleSgpOiBudW1iZXJcbiAgICBob28oYTogbnVtYmVyKTogbnVtYmVyXG59XG5cbi8qKlxuICogQSBiYXNlIGNsYXNzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGNsYXNzICh0byB2ZXJpZnkgbmF0aXZlIHR5cGUgbmFtZXMgYXJlIGNyZWF0ZWQgZm9yIGRlcml2ZWQgY2xhc3NlcykuXG4gICAgICovXG4gICAgcHVibGljIHR5cGVOYW1lKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuY29uc3RydWN0b3IgYXMgYW55KS5uYW1lO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlUHJvcHMgZXh0ZW5kcyBWZXJ5QmFzZVByb3BzIHtcbiAgICByZWFkb25seSBiYXI6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQmFzZUludGVyZmFjZSBleHRlbmRzIElWZXJ5QmFzZUludGVyZmFjZSB7XG4gICAgYmFyKCk6IHZvaWQ7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3Mgd2hpY2ggcmVwcmVzZW50cyBhIG51bWVyaWMgdmFsdWUuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWYWx1ZSBleHRlbmRzIEJhc2Uge1xuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgdmFsdWU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgZ2VuZXJhbCBjb250cmFjdCBmb3IgYSBjb25jcmV0ZSBudW1iZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSURvdWJsYWJsZSB7XG4gICAgcmVhZG9ubHkgZG91YmxlVmFsdWU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29uY3JldGUgbnVtYmVyLlxuICovXG5leHBvcnQgY2xhc3MgTnVtYmVyIGV4dGVuZHMgVmFsdWUgaW1wbGVtZW50cyBJRG91YmxhYmxlIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTnVtYmVyIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIG51bWJlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBtdWx0aXBsaWVkIGJ5IDIuXG4gICAgICovXG4gICAgZ2V0IGRvdWJsZVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gMiAqIHRoaXMudmFsdWU7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gb3BlcmF0aW9uIG9uIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9wZXJhdGlvbiBleHRlbmRzIFZhbHVlIHtcbiAgICBwdWJsaWMgYWJzdHJhY3QgdG9TdHJpbmcoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFwcGxpZXMgdG8gY2xhc3NlcyB0aGF0IGFyZSBjb25zaWRlcmVkIGZyaWVuZGx5LiBUaGVzZSBjbGFzc2VzIGNhbiBiZSBncmVldGVkIHdpdGhcbiAqIGEgXCJoZWxsb1wiIG9yIFwiZ29vZGJ5ZVwiIGJsZXNzaW5nIGFuZCB0aGV5IHdpbGwgcmVzcG9uZCBiYWNrIGluIGEgZnVuIGFuZCBmcmllbmRseSBtYW5uZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUZyaWVuZGx5IHtcbiAgICAvKipcbiAgICAgKiBTYXkgaGVsbG8hXG4gICAgICovXG4gICAgaGVsbG8oKTogc3RyaW5nXG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgZmlyc3Qgc3RydWN0IHdlIGhhdmUgY3JlYXRlZCBpbiBqc2lpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTXlGaXJzdFN0cnVjdCB7XG4gICAgLyoqXG4gICAgICogQSBzdHJpbmcgdmFsdWVcbiAgICAgKi9cbiAgICByZWFkb25seSBhc3RyaW5nOiBzdHJpbmdcblxuICAgIC8qKlxuICAgICAqIEFuIGF3ZXNvbWUgbnVtYmVyIHZhbHVlXG4gICAgICovXG4gICAgcmVhZG9ubHkgYW51bWJlcjogbnVtYmVyXG4gICAgcmVhZG9ubHkgZmlyc3RPcHRpb25hbD86IHN0cmluZ1tdXG59XG5cbi8qKlxuICogVGhpcyBpcyBhIHN0cnVjdCB3aXRoIG9ubHkgb3B0aW9uYWwgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdHJ1Y3RXaXRoT25seU9wdGlvbmFscyB7XG4gICAgLyoqXG4gICAgICogVGhlIGZpcnN0IG9wdGlvbmFsIVxuICAgICAqL1xuICAgIHJlYWRvbmx5IG9wdGlvbmFsMT86IHN0cmluZ1xuICAgIHJlYWRvbmx5IG9wdGlvbmFsMj86IG51bWJlclxuICAgIHJlYWRvbmx5IG9wdGlvbmFsMz86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBDaGVjayB0aGF0IGVudW1zIGZyb20gXFxAc2NvcGVkIHBhY2thZ2VzIGNhbiBiZSByZWZlcmVuY2VzLlxuICogU2VlIGF3c2xhYnMvanNpaSMxMzhcbiAqL1xuZXhwb3J0IGVudW0gRW51bUZyb21TY29wZWRNb2R1bGUge1xuICAgIFZBTFVFMSxcbiAgICBWQUxVRTJcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgdGhhdCBpbmhlcml0cyBmcm9tIHBhY2thZ2VzIDIgbGV2ZWxzIHVwIHRoZSB0cmVlXG4gKlxuICogVGhlaXIgcHJlc2VuY2UgdmFsaWRhdGVzIHRoYXQgLk5FVC9KYXZhL2pzaWktcmVmbGVjdCBjYW4gdHJhY2sgYWxsIGZpZWxkc1xuICogZmFyIGVub3VnaCB1cCB0aGUgdHJlZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJVGhyZWVMZXZlbHNJbnRlcmZhY2UgZXh0ZW5kcyBJQmFzZUludGVyZmFjZSB7XG4gICAgYmF6KCk6IHZvaWQ7XG59XG5cbi8qKlxuICogRXZlbiBmcmllbmRsaWVyIGNsYXNzZXMgY2FuIGltcGxlbWVudCB0aGlzIGludGVyZmFjZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRnJpZW5kbGllciBleHRlbmRzIElGcmllbmRseSB7XG4gICAgLyoqXG4gICAgICogU2F5IGdvb2RieWUuXG4gICAgICogQHJldHVybnMgQSBnb29kYnllIGJsZXNzaW5nLlxuICAgICAqL1xuICAgIGdvb2RieWUoKTogc3RyaW5nXG5cbiAgICAvKipcbiAgICAgKiBTYXkgZmFyZXdlbGwuXG4gICAgICovXG4gICAgZmFyZXdlbGwoKTogc3RyaW5nXG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbSBudW1iZXJzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSYW5kb21OdW1iZXJHZW5lcmF0b3Ige1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW5vdGhlciByYW5kb20gbnVtYmVyLlxuICAgICAqIEByZXR1cm5zIEEgcmFuZG9tIG51bWJlci5cbiAgICAgKi9cbiAgICBuZXh0KCk6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGcmllbmRseVJhbmRvbUdlbmVyYXRvciBleHRlbmRzIElSYW5kb21OdW1iZXJHZW5lcmF0b3IsIElGcmllbmRseSB7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIG9wZXJhdGlvbiB3aXRoIHR3byBvcGVyYW5kcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJpbmFyeU9wZXJhdGlvbiBleHRlbmRzIE9wZXJhdGlvbiBpbXBsZW1lbnRzIElGcmllbmRseSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEJpbmFyeU9wZXJhdGlvblxuICAgICAqIEBwYXJhbSBsaHMgTGVmdC1oYW5kIHNpZGUgb3BlcmFuZFxuICAgICAqIEBwYXJhbSByaHMgUmlnaHQtaGFuZCBzaWRlIG9wZXJhbmRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBsaHM6IFZhbHVlLCByZWFkb25seSByaHM6IFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaGVsbG8oKSB7XG4gICAgICAgIHJldHVybiAnSGVsbG8sIEkgYW0gYSBiaW5hcnkgb3BlcmF0aW9uLiBXaGF0XFwncyB5b3VyIG5hbWU/JztcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIFwiK1wiIGJpbmFyeSBvcGVyYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBBZGQgZXh0ZW5kcyBCaW5hcnlPcGVyYXRpb24ge1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGhzLnZhbHVlICsgdGhpcy5yaHMudmFsdWU7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgKCR7dGhpcy5saHN9ICsgJHt0aGlzLnJoc30pYFxuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgXCIqXCIgYmluYXJ5IG9wZXJhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE11bHRpcGx5IGV4dGVuZHMgQmluYXJ5T3BlcmF0aW9uIGltcGxlbWVudHMgSUZyaWVuZGxpZXIsIElSYW5kb21OdW1iZXJHZW5lcmF0b3Ige1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGhzLnZhbHVlICogdGhpcy5yaHMudmFsdWU7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgKCR7dGhpcy5saHN9ICogJHt0aGlzLnJoc30pYFxuICAgIH1cblxuICAgIGdvb2RieWUoKSB7XG4gICAgICAgIHJldHVybiAnR29vZGJ5ZSBmcm9tIE11bHRpcGx5ISc7XG4gICAgfVxuXG4gICAgZmFyZXdlbGwoKSB7XG4gICAgICAgIHJldHVybiAnRmFyZXdlbGwgdG8geW91IHRvbyEnO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHJldHVybiA4OTtcbiAgICB9XG59XG5cbi8qKlxuICogQW4gb3BlcmF0aW9uIG9uIGEgc2luZ2xlIG9wZXJhbmQuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVbmFyeU9wZXJhdGlvbiBleHRlbmRzIE9wZXJhdGlvbiB7XG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgb3BlcmFuZDogVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIG5lZ2F0aW9uIG9wZXJhdGlvbiAoXCItdmFsdWVcIilcbiAqL1xuZXhwb3J0IGNsYXNzIE5lZ2F0ZSBleHRlbmRzIFVuYXJ5T3BlcmF0aW9uIGltcGxlbWVudHMgSUZyaWVuZGxpZXIge1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIC0xICogdGhpcy5vcGVyYW5kLnZhbHVlO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYC0ke3RoaXMub3BlcmFuZH1gO1xuICAgIH1cblxuICAgIGhlbGxvKCkge1xuICAgICAgICByZXR1cm4gJ0kga25vdyBJIGFtIGNhbGxlZCBOZWdhdGUsIGJ1dCBJIGFtIGZyaWVuZGx5JztcbiAgICB9XG5cbiAgICBnb29kYnllKCkge1xuICAgICAgICByZXR1cm4gJ1NlZSB5b3UgZnJpZW5kJztcbiAgICB9XG5cbiAgICBmYXJld2VsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29vZGJ5ZSgpICsgJywgb2ggZmFyZXdlbGwhJztcbiAgICB9XG59XG5cbi8qKlxuICogVXRpbGl0aWVzIGZvciBjb21wb3NpbmcgbXVsdGlwbGUgb3BlcmF0aW9ucy5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBjb21wb3NpdGlvbiB7XG4gICAgLyoqXG4gICAgICogQWJzdHJhY3Qgb3BlcmF0aW9uIGNvbXBvc2VkIGZyb20gYW4gZXhwcmVzc2lvbiBvZiBvdGhlciBvcGVyYXRpb25zLlxuICAgICAqL1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb3NpdGVPcGVyYXRpb24gZXh0ZW5kcyBPcGVyYXRpb24ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIC50b1N0cmluZygpIHN0eWxlLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0cmluZ1N0eWxlID0gQ29tcG9zaXRlT3BlcmF0aW9uLkNvbXBvc2l0aW9uU3RyaW5nU3R5bGUuTk9STUFMXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc2V0IG9mIHByZWZpeGVzIHRvIGluY2x1ZGUgaW4gYSBkZWNvcmF0ZWQgLnRvU3RyaW5nKCkuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZGVjb3JhdGlvblByZWZpeGVzID0gWyAnPDxbW3t7JyBdXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc2V0IG9mIHBvc3RmaXhlcyB0byBpbmNsdWRlIGluIGEgZGVjb3JhdGVkIC50b1N0cmluZygpLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGRlY29yYXRpb25Qb3N0Zml4ZXMgPSBbICd9fV1dPj4nIF07XG5cbiAgICAgICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwcmVzc2lvbi52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZXhwcmVzc2lvbiB0aGF0IHRoaXMgb3BlcmF0aW9uIGNvbnNpc3RzIG9mLlxuICAgICAgICAgKiBNdXN0IGJlIGltcGxlbWVudGVkIGJ5IGRlcml2ZWQgY2xhc3Nlcy5cbiAgICAgICAgICovXG4gICAgICAgIGFic3RyYWN0IHJlYWRvbmx5IGV4cHJlc3Npb246IFZhbHVlO1xuXG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnN0cmluZ1N0eWxlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBDb21wb3NpdGVPcGVyYXRpb24uQ29tcG9zaXRpb25TdHJpbmdTdHlsZS5OT1JNQUw6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cHJlc3Npb24udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBjYXNlIENvbXBvc2l0ZU9wZXJhdGlvbi5Db21wb3NpdGlvblN0cmluZ1N0eWxlLkRFQ09SQVRFRDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb3JhdGlvblByZWZpeGVzLmpvaW4oJycpICsgdGhpcy5leHByZXNzaW9uLnRvU3RyaW5nKCkgKyB0aGlzLmRlY29yYXRpb25Qb3N0Zml4ZXMuam9pbignJyk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHN0cmluZyBzdHlsZTogJHt0aGlzLnN0cmluZ1N0eWxlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBDb21wb3NpdGVPcGVyYXRpb24ge1xuICAgICAgICAvKipcbiAgICAgICAgICogU3R5bGUgb2YgLnRvU3RyaW5nKCkgb3V0cHV0IGZvciBDb21wb3NpdGVPcGVyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBleHBvcnQgZW51bSBDb21wb3NpdGlvblN0cmluZ1N0eWxlIHtcbiAgICAgICAgICAgIC8qKiBOb3JtYWwgc3RyaW5nIGV4cHJlc3Npb24gKi9cbiAgICAgICAgICAgIE5PUk1BTCxcblxuICAgICAgICAgICAgLyoqIERlY29yYXRlZCBzdHJpbmcgZXhwcmVzc2lvbiAqL1xuICAgICAgICAgICAgREVDT1JBVEVEXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQW4gb3BlcmF0aW9uIHRoYXQgc3VtcyBtdWx0aXBsZSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdW0gZXh0ZW5kcyBjb21wb3NpdGlvbi5Db21wb3NpdGVPcGVyYXRpb24ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHBhcnRzIHRvIHN1bS5cbiAgICAgKi9cbiAgICBwYXJ0czogVmFsdWVbXSA9IFtdO1xuXG4gICAgLy8gVE9ETzogc29tZSBhbm5veWluZyBidWcgaW4gTmFzaG9ybiB3aWxsIHRocm93IHRoaXMgZXhjZXB0aW9uIGlmXG4gICAgLy8gY2FsbCB0aGF0IHByb3RvdHlwZSdzIGN0b3IgdmlhIFwiYXBwbHlcIiBpbnN0ZWFkOiBqYXZhLmxhbmcuQXNzZXJ0aW9uRXJyb3I6IGR1cGxpY2F0ZSBjb2RlXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0IGV4cHJlc3Npb24oKSB7XG4gICAgICAgIGxldCBjdXJyOiBWYWx1ZSA9IG5ldyBOdW1iZXIoMCk7XG4gICAgICAgIGZvciAobGV0IHBhcnQgb2YgdGhpcy5wYXJ0cykge1xuICAgICAgICAgICAgY3VyciA9IG5ldyBBZGQoY3VyciwgcGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnI7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSBwb3dlciBvcGVyYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQb3dlciBleHRlbmRzIGNvbXBvc2l0aW9uLkNvbXBvc2l0ZU9wZXJhdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgUG93ZXIgb3BlcmF0aW9uLlxuICAgICAqIEBwYXJhbSBiYXNlIFRoZSBiYXNlIG9mIHRoZSBwb3dlclxuICAgICAqIEBwYXJhbSBwb3cgVGhlIG51bWJlciBvZiB0aW1lcyB0byBtdWx0aXBseVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGJhc2U6IFZhbHVlLCByZWFkb25seSBwb3c6IFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0IGV4cHJlc3Npb24oKTogVmFsdWUge1xuICAgICAgICBsZXQgY3VycjogT3BlcmF0aW9uID0gbmV3IE51bWJlcigxKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvdy52YWx1ZTsgKytpKSB7XG4gICAgICAgICAgICBjdXJyID0gbmV3IE11bHRpcGx5KGN1cnIsIHRoaXMuYmFzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnI7XG4gICAgfVxufVxuXG4vKipcbiAqIFByb3BlcnRpZXMgZm9yIENhbGN1bGF0b3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsY3VsYXRvclByb3BzIHtcbiAgICByZWFkb25seSBpbml0aWFsVmFsdWU/OiBudW1iZXJcbiAgICByZWFkb25seSBtYXhpbXVtVmFsdWU/OiBudW1iZXJcbn1cblxuLyoqXG4gKiBBIGNhbGN1bGF0b3Igd2hpY2ggbWFpbnRhaW5zIGEgY3VycmVudCB2YWx1ZSBhbmQgYWxsb3dzIGFkZGluZyBvcGVyYXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRvciBleHRlbmRzIGNvbXBvc2l0aW9uLkNvbXBvc2l0ZU9wZXJhdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgQ2FsY3VsYXRvciBvYmplY3QuXG4gICAgICogQHBhcmFtIHByb3BzIEluaXRpYWxpemF0aW9uIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJvcHM/OiBDYWxjdWxhdG9yUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBwcm9wcyA9IHByb3BzIHx8IHsgfTtcblxuICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSBwcm9wcy5pbml0aWFsVmFsdWUgPyBwcm9wcy5pbml0aWFsVmFsdWUgOiAwO1xuICAgICAgICB0aGlzLmN1cnIgPSBuZXcgTnVtYmVyKGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIHRoaXMubWF4VmFsdWUgPSBwcm9wcy5tYXhpbXVtVmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgdmFsdWUuXG4gICAgICovXG4gICAgcHVibGljIGN1cnI6IFZhbHVlXG5cbiAgICAvKipcbiAgICAgKiBBIG1hcCBvZiBwZXIgb3BlcmF0aW9uIG5hbWUgb2YgYWxsIG9wZXJhdGlvbnMgcGVyZm9ybWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBvcGVyYXRpb25zTWFwOiB7IFtvcDogc3RyaW5nXTogVmFsdWVbXSB9ID0geyB9XG5cbiAgICAvKipcbiAgICAgKiBBIGxvZyBvZiBhbGwgb3BlcmF0aW9ucy5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgb3BlcmF0aW9uc0xvZyA9IG5ldyBBcnJheTxWYWx1ZT4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBtYXhpbXVtIHZhbHVlIGFsbG93cyBpbiB0aGlzIGNhbGN1bGF0b3IuXG4gICAgICovXG4gICAgcHVibGljIG1heFZhbHVlPzogbnVtYmVyXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbnVtYmVyIHRvIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbignYWRkJywgbmV3IEFkZCh0aGlzLmN1cnIsIG5ldyBOdW1iZXIodmFsdWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbGllcyB0aGUgY3VycmVudCB2YWx1ZSBieSBhIG51bWJlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgbXVsKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hZGRPcGVyYXRpb24oJ211bCcsIG5ldyBNdWx0aXBseSh0aGlzLmN1cnIsIG5ldyBOdW1iZXIodmFsdWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmFpc2VzIHRoZSBjdXJyZW50IHZhbHVlIGJ5IGEgcG93ZXIuXG4gICAgICovXG4gICAgcHVibGljIHBvdyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYWRkT3BlcmF0aW9uKCdwb3cnLCBuZXcgUG93ZXIodGhpcy5jdXJyLCBuZXcgTnVtYmVyKHZhbHVlKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5lZ2F0ZXMgdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAgICovXG4gICAgcHVibGljIG5lZygpIHtcbiAgICAgICAgdGhpcy5hZGRPcGVyYXRpb24oJ25lZycsIG5ldyBOZWdhdGUodGhpcy5jdXJyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZXhwcmVzc2lvbi5cbiAgICAgKi9cbiAgICBnZXQgZXhwcmVzc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGFtcGxlIG9mIGEgcHJvcGVydHkgdGhhdCBhY2NlcHRzIGEgdW5pb24gb2YgdHlwZXMuXG4gICAgICovXG4gICAgcHVibGljIHVuaW9uUHJvcGVydHk/OiBBZGQgfCBNdWx0aXBseSB8IFBvd2VyXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRlaCB2YWx1ZSBvZiB0aGUgdW5pb24gcHJvcGVydHkgKGlmIGRlZmluZWQpLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkVW5pb25WYWx1ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVuaW9uUHJvcGVydHkpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudW5pb25Qcm9wZXJ0eS52YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZE9wZXJhdGlvbihvcDogc3RyaW5nLCB2YWx1ZTogVmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMubWF4VmFsdWUgJiYgdmFsdWUudmFsdWUgPiB0aGlzLm1heFZhbHVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE9wZXJhdGlvbiAke3ZhbHVlfSBleGNlZWRlZCBtYXhpbXVtIHZhbHVlICR7dGhpcy5tYXhWYWx1ZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5vcGVyYXRpb25zTWFwW29wXTtcbiAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICBsaXN0ID0gbmV3IEFycmF5PFZhbHVlPigpO1xuICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zTWFwW29wXSA9IGxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5wdXNoKHZhbHVlKTtcblxuICAgICAgICB0aGlzLm9wZXJhdGlvbnNMb2cucHVzaCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuY3VyciA9IHZhbHVlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBIZXJlJ3MgdGhlIGZpcnN0IGxpbmUgb2YgdGhlIFRTRG9jIGNvbW1lbnQuXG4gKlxuICogVGhpcyBpcyB0aGUgbWVhdCBvZiB0aGUgVFNEb2MgY29tbWVudC4gSXQgbWF5IGNvbnRhaW5cbiAqIG11bHRpcGxlIGxpbmVzIGFuZCBtdWx0aXBsZSBwYXJhZ3JhcGhzLlxuICpcbiAqIE11bHRpcGxlIHBhcmFncmFwaHMgYXJlIHNlcGFyYXRlZCBieSBhbiBlbXB0eSBsaW5lLlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIERvY3VtZW50ZWRDbGFzcyB7XG5cbiAgLyoqXG4gICAqIEdyZWV0IHRoZSBpbmRpY2F0ZWQgcGVyc29uLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgcHJpbnQgb3V0IGEgZnJpZW5kbHkgZ3JlZXRpbmcgaW50ZW5kZWQgZm9yXG4gICAqIHRoZSBpbmRpY2F0ZWQgcGVyc29uLlxuICAgKlxuICAgKiBAcGFyYW0gZ3JlZXRlZSBUaGUgcGVyc29uIHRvIGJlIGdyZWV0ZWQuXG4gICAqIEByZXR1cm5zIEEgbnVtYmVyIHRoYXQgZXZlcnlvbmUga25vd3MgdmVyeSB3ZWxsXG4gICAqL1xuICBwdWJsaWMgZ3JlZXQoZ3JlZXRlZTogR3JlZXRlZSA9IHt9KSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYEhlbGxvLCAke2dyZWV0ZWUubmFtZSB8fCAnd29ybGQnfVxcbmApO1xuICAgIHJldHVybiA0MjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXkgwqFIb2xhIVxuICAgKlxuICAgKiBAZXhwZXJpbWVudGFsXG4gICAqL1xuICBwdWJsaWMgaG9sYSgpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnYm9uam91cicpO1xuICB9XG59XG5cbi8qKlxuICogVGhlc2UgYXJlIHNvbWUgYXJndW1lbnRzIHlvdSBjYW4gcGFzcyB0byBhIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmVldGVlIHtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBncmVldGVlXG4gICAqXG4gICAqIEBkZWZhdWx0IHdvcmxkXG4gICAqL1xuICByZWFkb25seSBuYW1lPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIE9sZCBjbGFzc1xuICpcbiAqIEBkZXByZWNhdGVkIFVzZSB0aGUgbmV3IGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBPbGQge1xuICAvKipcbiAgICogRG9vIHdvcCB0aGF0IHRoaW5nXG4gICAqL1xuICBwdWJsaWMgZG9BVGhpbmcoKSB7XG4gICAgLy8gTm90aGluZyB0byBkb1xuICB9XG59XG5cbi8vXG4vLyBVbi1leHBvcnRlZCBiYXNlIGNsYXNzZXMgYXJlIGVyYXNlZFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2F3cy9qc2lpL2lzc3Vlcy80MTdcbi8vXG5jbGFzcyBKU0lJNDE3UHJpdmF0ZVJvb3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzUm9vdCA9IHRydWU7XG59XG5leHBvcnQgY2xhc3MgSlNJSTQxN1B1YmxpY0Jhc2VPZkJhc2UgZXh0ZW5kcyBKU0lJNDE3UHJpdmF0ZVJvb3Qge1xuICBwdWJsaWMgc3RhdGljIG1ha2VJbnN0YW5jZSgpOiBKU0lJNDE3UHVibGljQmFzZU9mQmFzZSB7XG4gICAgcmV0dXJuIG5ldyBKU0lJNDE3UHJpdmF0ZUJhc2UoXCJURVNUXCIpO1xuICB9XG4gIHB1YmxpYyBmb28oKSB7IHJldHVybjsgfVxufVxuY2xhc3MgSlNJSTQxN1ByaXZhdGVCYXNlIGV4dGVuZHMgSlNJSTQxN1B1YmxpY0Jhc2VPZkJhc2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgcHJvcGVydHk6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgcHVibGljIGJhcigpIHsgcmV0dXJuOyB9XG59XG5leHBvcnQgY2xhc3MgSlNJSTQxN0Rlcml2ZWQgZXh0ZW5kcyBKU0lJNDE3UHJpdmF0ZUJhc2Uge1xuICBwdWJsaWMgYmFyKCkge1xuICAgIHJldHVybiBzdXBlci5iYXIoKTtcbiAgfVxuICBwdWJsaWMgYmF6KCkgeyByZXR1cm47IH1cbn1cbi8vIFNhbWUgdGhpbmcgd2l0aCBpbnRlcmZhY2VzXG5pbnRlcmZhY2UgSUpTSUk0MTdQcml2YXRlUm9vdCB7XG4gIHJlYWRvbmx5IGhhc1Jvb3Q6IGJvb2xlYW47XG59XG5leHBvcnQgaW50ZXJmYWNlIElKU0lJNDE3UHVibGljQmFzZU9mQmFzZSBleHRlbmRzIElKU0lJNDE3UHJpdmF0ZVJvb3Qge1xuICBmb28oKTogdm9pZDtcbn1cbmludGVyZmFjZSBJSlNJSTQxN1ByaXZhdGVCYXNlIGV4dGVuZHMgSUpTSUk0MTdQdWJsaWNCYXNlT2ZCYXNlIHtcbiAgcmVhZG9ubHkgcHJvcGVydHk6IHN0cmluZztcbiAgYmFyKCk6IHZvaWQ7XG59XG5leHBvcnQgaW50ZXJmYWNlIElKU0lJNDE3RGVyaXZlZCBleHRlbmRzIElKU0lJNDE3UHJpdmF0ZUJhc2Uge1xuICBiYXooKTogdm9pZDtcbn1cblxuLy9cbi8vIEludGVyZmFjZXMgc2hvdWxkIGJlIGNvcGllZCBmcm9tIGVyYXNlZCBjbGFzc2VzIHRvIHB1YmxpYyBjbGFzc2VzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYXdzL2pzaWkvaXNzdWVzLzQ4N1xuLy9cbmV4cG9ydCBpbnRlcmZhY2UgSUpzaWk0ODdFeHRlcm5hbCB7IH1cbmV4cG9ydCBpbnRlcmZhY2UgSUpzaWk0ODdFeHRlcm5hbDIgeyB9XG5jbGFzcyBKc2lpNDg3SW50ZXJuYWwgaW1wbGVtZW50cyBJSnNpaTQ4N0V4dGVybmFsIHsgfVxuZXhwb3J0IGNsYXNzIEpzaWk0ODdEZXJpdmVkIGV4dGVuZHMgSnNpaTQ4N0ludGVybmFsIGltcGxlbWVudHMgSUpzaWk0ODdFeHRlcm5hbDIgeyB9XG5cbi8vXG4vLyBEZWR1cGxpY2F0ZSBpbnRlcmZhY2VzIHRoYXQgY29tZSBmcm9tIGRpZmZlcmVudCBkZWNsYXJhdGlvbiBzaXRlc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2F3cy9qc2lpL2lzc3Vlcy80OTZcbi8vXG5leHBvcnQgaW50ZXJmYWNlIElKc2lpNDk2IHsgfVxuY2xhc3MgSnNpaTQ5NkJhc2UgaW1wbGVtZW50cyBJSnNpaTQ5NiB7IH1cbmV4cG9ydCBjbGFzcyBKc2lpNDk2RGVyaXZlZCBleHRlbmRzIEpzaWk0OTZCYXNlIGltcGxlbWVudHMgSUpzaWk0OTYgeyB9XG5cbi8vIFRoZSBmb2xsb3dpbmcgdGVzdHMgdmFsaWRhdGUgZW1pc3Npb24gb2Ygc3RhYmlsaXR5IG1hcmtlcnNcblxuLyoqIEBleHBlcmltZW50YWwgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXhwZXJpbWVudGFsU3RydWN0IHtcbiAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgcmVhZG9ubHkgcmVhZG9ubHlQcm9wZXJ0eTogc3RyaW5nO1xufVxuLyoqIEBleHBlcmltZW50YWwgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUV4cGVyaW1lbnRhbEludGVyZmFjZSB7XG4gIC8qKiBAZXhwZXJpbWVudGFsICovXG4gIG11dGFibGVQcm9wZXJ0eT86IG51bWJlcjtcbiAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgbWV0aG9kKCk6IHZvaWQ7XG59XG4vKiogQGV4cGVyaW1lbnRhbCAqL1xuZXhwb3J0IGNsYXNzIEV4cGVyaW1lbnRhbENsYXNzIHtcbiAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgcHVibGljIHJlYWRvbmx5IHJlYWRvbmx5UHJvcGVydHk6IHN0cmluZztcbiAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgcHVibGljIG11dGFibGVQcm9wZXJ0eT86IG51bWJlcjtcbiAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgY29uc3RydWN0b3IocmVhZG9ubHlTdHJpbmc6IHN0cmluZywgbXV0YWJsZU51bWJlcj86IG51bWJlcikge1xuICAgIHRoaXMucmVhZG9ubHlQcm9wZXJ0eSA9IHJlYWRvbmx5U3RyaW5nO1xuICAgIHRoaXMubXV0YWJsZVByb3BlcnR5ID0gbXV0YWJsZU51bWJlcjtcbiAgfVxuXG4gIC8qKiBAZXhwZXJpbWVudGFsICovXG4gIHB1YmxpYyBtZXRob2QoKTogdm9pZCB7IHJldHVybjsgfVxufVxuLyoqIEBleHBlcmltZW50YWwgKi9cbmV4cG9ydCBlbnVtIEV4cGVyaW1lbnRhbEVudW0ge1xuICAvKiogQGV4cGVyaW1lbnRhbCAqL1xuICBPUFRJT05fQSxcbiAgLyoqIEBleHBlcmltZW50YWwgKi9cbiAgT1BUSU9OX0Jcbn1cblxuLyoqIEBzdGFibGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhYmxlU3RydWN0IHtcbiAgLyoqIEBzdGFibGUgKi9cbiAgcmVhZG9ubHkgcmVhZG9ubHlQcm9wZXJ0eTogc3RyaW5nO1xufVxuLyoqIEBzdGFibGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YWJsZUludGVyZmFjZSB7XG4gIC8qKiBAc3RhYmxlICovXG4gIG11dGFibGVQcm9wZXJ0eT86IG51bWJlcjtcbiAgLyoqIEBzdGFibGUgKi9cbiAgbWV0aG9kKCk6IHZvaWQ7XG59XG4vKiogQHN0YWJsZSAqL1xuZXhwb3J0IGNsYXNzIFN0YWJsZUNsYXNzIHtcbiAgLyoqIEBzdGFibGUgKi9cbiAgcHVibGljIHJlYWRvbmx5IHJlYWRvbmx5UHJvcGVydHk6IHN0cmluZyA9ICd3YXpvbyc7XG4gIC8qKiBAc3RhYmxlICovXG4gIHB1YmxpYyBtdXRhYmxlUHJvcGVydHk/OiBudW1iZXI7XG4gIC8qKiBAc3RhYmxlICovXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5U3RyaW5nOiBzdHJpbmcsIG11dGFibGVOdW1iZXI/OiBudW1iZXIpIHtcbiAgICB0aGlzLnJlYWRvbmx5UHJvcGVydHkgPSByZWFkb25seVN0cmluZztcbiAgICB0aGlzLm11dGFibGVQcm9wZXJ0eSA9IG11dGFibGVOdW1iZXI7XG4gIH1cbiAgLyoqIEBzdGFibGUgKi9cbiAgcHVibGljIG1ldGhvZCgpOiB2b2lkIHsgcmV0dXJuOyB9XG59XG4vKiogQHN0YWJsZSAqL1xuZXhwb3J0IGVudW0gU3RhYmxlRW51bSB7XG4gIC8qKiBAc3RhYmxlICovXG4gIE9QVElPTl9BLFxuICAvKiogQHN0YWJsZSAqL1xuICBPUFRJT05fQlxufVxuXG4vKiogQGRlcHJlY2F0ZWQgaXQganVzdCB3cmFwcyBhIHN0cmluZyAqL1xuZXhwb3J0IGludGVyZmFjZSBEZXByZWNhdGVkU3RydWN0IHtcbiAgLyoqIEBkZXByZWNhdGVkIHdlbGwsIHllYWggKi9cbiAgcmVhZG9ubHkgcmVhZG9ubHlQcm9wZXJ0eTogc3RyaW5nO1xufVxuLyoqIEBkZXByZWNhdGVkIHVzZWxlc3MgaW50ZXJmYWNlICovXG5leHBvcnQgaW50ZXJmYWNlIElEZXByZWNhdGVkSW50ZXJmYWNlIHtcbiAgLyoqIEBkZXByZWNhdGVkIGNvdWxkIGJlIGJldHRlciAqL1xuICBtdXRhYmxlUHJvcGVydHk/OiBudW1iZXI7XG4gIC8qKiBAZGVwcmVjYXRlZCBzZXJ2aWNlcyBubyBwdXJwb3NlICovXG4gIG1ldGhvZCgpOiB2b2lkO1xufVxuLyoqIEBkZXByZWNhdGVkIGEgcHJldHR5IGJvcmluZyBjbGFzcyAqL1xuZXhwb3J0IGNsYXNzIERlcHJlY2F0ZWRDbGFzcyB7XG4gIC8qKiBAZGVwcmVjYXRlZCB0aGlzIGlzIG5vdCBhbHdheXMgXCJ3YXpvb1wiLCBiZSByZWFkeSB0byBiZSBkaXNhcHBvaW50ZWQgKi9cbiAgcHVibGljIHJlYWRvbmx5IHJlYWRvbmx5UHJvcGVydHk6IHN0cmluZztcbiAgLyoqIEBkZXByZWNhdGVkIHNob3VsZG4ndCBoYXZlIGJlZW4gbXV0YWJsZSAqL1xuICBwdWJsaWMgbXV0YWJsZVByb3BlcnR5PzogbnVtYmVyO1xuICAvKiogQGRlcHJlY2F0ZWQgdGhpcyBjb25zdHJ1Y3RvciBpcyBcImp1c3RcIiBva2F5ICovXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5U3RyaW5nOiBzdHJpbmcsIG11dGFibGVOdW1iZXI/OiBudW1iZXIpIHtcbiAgICB0aGlzLnJlYWRvbmx5UHJvcGVydHkgPSByZWFkb25seVN0cmluZztcbiAgICB0aGlzLm11dGFibGVQcm9wZXJ0eSA9IG11dGFibGVOdW1iZXI7XG4gIH1cbiAgLyoqIEBkZXByZWNhdGVkIGl0IHdhcyBhIGJhZCBpZGVhICovXG4gIHB1YmxpYyBtZXRob2QoKTogdm9pZCB7IHJldHVybjsgfVxufVxuLyoqIEBkZXByZWNhdGVkIHlvdXIgZGVwcmVjYXRlZCBzZWxlY3Rpb24gb2YgYmFkIG9wdGlvbnMgKi9cbmV4cG9ydCBlbnVtIERlcHJlY2F0ZWRFbnVtIHtcbiAgLyoqIEBkZXByZWNhdGVkIG9wdGlvbiBBIGlzIG5vdCBncmVhdCAqL1xuICBPUFRJT05fQSxcbiAgLyoqIEBkZXByZWNhdGVkIG9wdGlvbiBCIGlzIGtpbmRhIGJhZCwgdG9vICovXG4gIE9QVElPTl9CXG59Il19