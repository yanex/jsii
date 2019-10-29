package org.yanex.hello;

/**
 * The "*" binary operation.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.412Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Multiply")
public class Multiply extends org.yanex.hello.BinaryOperation implements org.yanex.hello.IFriendlier,org.yanex.hello.IRandomNumberGenerator {

    protected Multiply(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Multiply(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a BinaryOperation.
     * 
     * @param lhs Left-hand side operand. This parameter is required.
     * @param rhs Right-hand side operand. This parameter is required.
     */
    public Multiply(final org.yanex.hello.Value lhs, final org.yanex.hello.Value rhs) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(lhs, "lhs is required"), java.util.Objects.requireNonNull(rhs, "rhs is required") }));
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
     * Returns another random number.
     */
    @Override
    public java.lang.Number next() {
        return this.jsiiCall("next", java.lang.Number.class);
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
