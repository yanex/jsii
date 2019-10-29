package org.yanex.hello;

/**
 * Even friendlier classes can implement this interface.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.409Z")
public interface IFriendlier extends software.amazon.jsii.JsiiSerializable, org.yanex.hello.IFriendly {

    /**
     * Say farewell.
     */
    java.lang.String farewell();

    /**
     * Say goodbye.
     * 
     * @return A goodbye blessing.
     */
    java.lang.String goodbye();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IFriendlier {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * Say farewell.
         */
        @Override
        public java.lang.String farewell() {
            return this.jsiiCall("farewell", java.lang.String.class);
        }

        /**
         * Say goodbye.
         * 
         * @return A goodbye blessing.
         */
        @Override
        public java.lang.String goodbye() {
            return this.jsiiCall("goodbye", java.lang.String.class);
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
