package org.yanex.hello;

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.410Z")
public interface IFriendlyRandomGenerator extends software.amazon.jsii.JsiiSerializable, org.yanex.hello.IRandomNumberGenerator, org.yanex.hello.IFriendly {

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IFriendlyRandomGenerator {
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

        /**
         * Say hello!
         */
        @Override
        public java.lang.String hello() {
            return this.jsiiCall("hello", java.lang.String.class);
        }
    }
}
