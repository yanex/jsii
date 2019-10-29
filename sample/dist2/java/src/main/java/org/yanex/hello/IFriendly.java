package org.yanex.hello;

/**
 * Applies to classes that are considered friendly.
 * 
 * These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.410Z")
public interface IFriendly extends software.amazon.jsii.JsiiSerializable {

    /**
     * Say hello!
     */
    java.lang.String hello();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IFriendly {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
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
