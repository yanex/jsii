package org.yanex.hello;

/**
 * The "+" binary operation.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.399Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Add")
public class Add extends org.yanex.hello.BinaryOperation {

    protected Add(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Add(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a BinaryOperation.
     * 
     * @param lhs Left-hand side operand. This parameter is required.
     * @param rhs Right-hand side operand. This parameter is required.
     */
    public Add(final org.yanex.hello.Value lhs, final org.yanex.hello.Value rhs) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(lhs, "lhs is required"), java.util.Objects.requireNonNull(rhs, "rhs is required") }));
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
