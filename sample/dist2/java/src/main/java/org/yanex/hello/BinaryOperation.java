package org.yanex.hello;

/**
 * Represents an operation with two operands.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.404Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.BinaryOperation")
public abstract class BinaryOperation extends org.yanex.hello.Operation implements org.yanex.hello.IFriendly {

    protected BinaryOperation(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected BinaryOperation(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a BinaryOperation.
     * 
     * @param lhs Left-hand side operand. This parameter is required.
     * @param rhs Right-hand side operand. This parameter is required.
     */
    protected BinaryOperation(final org.yanex.hello.Value lhs, final org.yanex.hello.Value rhs) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(lhs, "lhs is required"), java.util.Objects.requireNonNull(rhs, "rhs is required") }));
    }

    /**
     * Say hello!
     */
    @Override
    public java.lang.String hello() {
        return this.jsiiCall("hello", java.lang.String.class);
    }

    /**
     * Left-hand side operand.
     */
    public org.yanex.hello.Value getLhs() {
        return this.jsiiGet("lhs", org.yanex.hello.Value.class);
    }

    /**
     * Right-hand side operand.
     */
    public org.yanex.hello.Value getRhs() {
        return this.jsiiGet("rhs", org.yanex.hello.Value.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends org.yanex.hello.BinaryOperation {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * The value.
         */
        @Override
        public java.lang.Number getValue() {
            return this.jsiiGet("value", java.lang.Number.class);
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
    }
}
