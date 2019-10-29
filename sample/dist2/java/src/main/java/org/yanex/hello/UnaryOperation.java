package org.yanex.hello;

/**
 * An operation on a single operand.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.416Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.UnaryOperation")
public abstract class UnaryOperation extends org.yanex.hello.Operation {

    protected UnaryOperation(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected UnaryOperation(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected UnaryOperation(final org.yanex.hello.Value operand) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(operand, "operand is required") }));
    }

    public org.yanex.hello.Value getOperand() {
        return this.jsiiGet("operand", org.yanex.hello.Value.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends org.yanex.hello.UnaryOperation {
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
         * String representation of the value.
         */
        @Override
        public java.lang.String toString() {
            return this.jsiiCall("toString", java.lang.String.class);
        }
    }
}
