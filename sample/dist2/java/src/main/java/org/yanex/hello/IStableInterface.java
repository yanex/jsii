package org.yanex.hello;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.411Z")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IStableInterface extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    java.lang.Number getMutableProperty();

    /**
     */
    void setMutableProperty(final java.lang.Number value);

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    void method();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IStableInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public java.lang.Number getMutableProperty() {
            return this.jsiiGet("mutableProperty", java.lang.Number.class);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public void setMutableProperty(final java.lang.Number value) {
            this.jsiiSet("mutableProperty", value);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public void method() {
            this.jsiiCall("method", Void.class);
        }
    }
}
