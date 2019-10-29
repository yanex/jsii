package org.yanex.hello;

/**
 * The general contract for a concrete number.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.409Z")
public interface IDoublable extends software.amazon.jsii.JsiiSerializable {

    java.lang.Number getDoubleValue();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IDoublable {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        @Override
        public java.lang.Number getDoubleValue() {
            return this.jsiiGet("doubleValue", java.lang.Number.class);
        }
    }
}
