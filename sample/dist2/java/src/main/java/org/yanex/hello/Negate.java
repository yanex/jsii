package org.yanex.hello;

/**
 * The negation operation ("-value").
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.414Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Negate")
public class Negate extends org.yanex.hello.UnaryOperation implements org.yanex.hello.IFriendlier {

    protected Negate(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Negate(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public Negate(final org.yanex.hello.Value operand) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(operand, "operand is required") }));
    }

    /**
     * Say farewell.
     */
    @Override
    public java.lang.String farewell() {
        return this.jsiiCall("farewell", java.lang.String.class);
    }

    /**
     * Say goodbye.
     */
    @Override
    public java.lang.String goodbye() {
        return this.jsiiCall("goodbye", java.lang.String.class);
    }

    /**
     * Say hello!
     */
    @Override
    public java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }

    /**
     * String representation of the value.
     */
    @Override
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }

    /**
     * The value.
     */
    @Override
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }
}
