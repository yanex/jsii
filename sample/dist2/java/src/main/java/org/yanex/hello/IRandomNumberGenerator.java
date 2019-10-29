package org.yanex.hello;

/**
 * Generates random numbers.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.411Z")
public interface IRandomNumberGenerator extends software.amazon.jsii.JsiiSerializable {

    /**
     * Returns another random number.
     * 
     * @return A random number.
     */
    java.lang.Number next();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IRandomNumberGenerator {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * Returns another random number.
         * 
         * @return A random number.
         */
        @Override
        public java.lang.Number next() {
            return this.jsiiCall("next", java.lang.Number.class);
        }
    }
}
