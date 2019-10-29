package org.yanex.hello;

/**
 * A calculator which maintains a current value and allows adding operations.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.405Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Calculator")
public class Calculator extends org.yanex.hello.composition.CompositeOperation {

    protected Calculator(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Calculator(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a Calculator object.
     * 
     * @param props Initialization properties.
     */
    public Calculator(final org.yanex.hello.CalculatorProps props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { props }));
    }

    /**
     * Creates a Calculator object.
     */
    public Calculator() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * Adds a number to the current value.
     * 
     * @param value This parameter is required.
     */
    public void add(final java.lang.Number value) {
        this.jsiiCall("add", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Multiplies the current value by a number.
     * 
     * @param value This parameter is required.
     */
    public void mul(final java.lang.Number value) {
        this.jsiiCall("mul", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Negates the current value.
     */
    public void neg() {
        this.jsiiCall("neg", Void.class);
    }

    /**
     * Raises the current value by a power.
     * 
     * @param value This parameter is required.
     */
    public void pow(final java.lang.Number value) {
        this.jsiiCall("pow", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Returns teh value of the union property (if defined).
     */
    public java.lang.Number readUnionValue() {
        return this.jsiiCall("readUnionValue", java.lang.Number.class);
    }

    /**
     * Returns the expression.
     */
    @Override
    public org.yanex.hello.Value getExpression() {
        return this.jsiiGet("expression", org.yanex.hello.Value.class);
    }

    /**
     * A log of all operations.
     */
    public java.util.List<org.yanex.hello.Value> getOperationsLog() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("operationsLog", java.util.List.class));
    }

    /**
     * A map of per operation name of all operations performed.
     */
    public java.util.Map<java.lang.String, java.util.List<org.yanex.hello.Value>> getOperationsMap() {
        return java.util.Collections.unmodifiableMap(this.jsiiGet("operationsMap", java.util.Map.class));
    }

    /**
     * The current value.
     */
    public org.yanex.hello.Value getCurr() {
        return this.jsiiGet("curr", org.yanex.hello.Value.class);
    }

    /**
     * The current value.
     */
    public void setCurr(final org.yanex.hello.Value value) {
        this.jsiiSet("curr", java.util.Objects.requireNonNull(value, "curr is required"));
    }

    /**
     * The maximum value allows in this calculator.
     */
    public java.lang.Number getMaxValue() {
        return this.jsiiGet("maxValue", java.lang.Number.class);
    }

    /**
     * The maximum value allows in this calculator.
     */
    public void setMaxValue(final java.lang.Number value) {
        this.jsiiSet("maxValue", value);
    }

    /**
     * Example of a property that accepts a union of types.
     */
    public java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }

    /**
     * Example of a property that accepts a union of types.
     */
    public void setUnionProperty(final org.yanex.hello.Add value) {
        this.jsiiSet("unionProperty", value);
    }

    /**
     * Example of a property that accepts a union of types.
     */
    public void setUnionProperty(final org.yanex.hello.Multiply value) {
        this.jsiiSet("unionProperty", value);
    }

    /**
     * Example of a property that accepts a union of types.
     */
    public void setUnionProperty(final org.yanex.hello.Power value) {
        this.jsiiSet("unionProperty", value);
    }
}
