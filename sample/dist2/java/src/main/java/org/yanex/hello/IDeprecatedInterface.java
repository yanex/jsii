package org.yanex.hello;

/**
 * @deprecated useless interface
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.409Z")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
public interface IDeprecatedInterface extends software.amazon.jsii.JsiiSerializable {

    /**
     * @deprecated could be better
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.Number getMutableProperty();

    /**
     * @deprecated could be better
     */
    void setMutableProperty(final java.lang.Number value);

    /**
     * @deprecated services no purpose
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    void method();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IDeprecatedInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * @deprecated could be better
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public java.lang.Number getMutableProperty() {
            return this.jsiiGet("mutableProperty", java.lang.Number.class);
        }

        /**
         * @deprecated could be better
         */
        @Override
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public void setMutableProperty(final java.lang.Number value) {
            this.jsiiSet("mutableProperty", value);
        }

        /**
         * @deprecated services no purpose
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Override
        public void method() {
            this.jsiiCall("method", Void.class);
        }
    }
}
