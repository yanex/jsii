package org.yanex.hello;

/**
 * Represents an operation on values.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.415Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Operation")
public abstract class Operation extends org.yanex.hello.Value {

    protected Operation(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Operation(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected Operation() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * String representation of the value.
     */
    @Override
    public abstract java.lang.String toString();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends org.yanex.hello.Operation {
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
