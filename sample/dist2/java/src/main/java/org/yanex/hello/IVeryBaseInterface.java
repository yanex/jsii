package org.yanex.hello;

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.411Z")
public interface IVeryBaseInterface extends software.amazon.jsii.JsiiSerializable {

    void foo();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IVeryBaseInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        @Override
        public void foo() {
            this.jsiiCall("foo", Void.class);
        }
    }
}
