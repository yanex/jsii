package org.yanex.hello;

/**
 * Represents a concrete number.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.414Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Number")
public class Number extends org.yanex.hello.Value implements org.yanex.hello.IDoublable {

    protected Number(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Number(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a Number object.
     * 
     * @param value The number. This parameter is required.
     */
    public Number(final java.lang.Number value) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(value, "value is required") }));
    }

    /**
     * The number multiplied by 2.
     */
    @Override
    public java.lang.Number getDoubleValue() {
        return this.jsiiGet("doubleValue", java.lang.Number.class);
    }

    /**
     * The number.
     */
    @Override
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
