package org.yanex.hello;

/**
 * Interface that inherits from packages 2 levels up the tree.
 * 
 * Their presence validates that .NET/Java/jsii-reflect can track all fields
 * far enough up the tree.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.411Z")
public interface IThreeLevelsInterface extends software.amazon.jsii.JsiiSerializable, org.yanex.hello.IBaseInterface {

    void baz();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IThreeLevelsInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        @Override
        public void baz() {
            this.jsiiCall("baz", Void.class);
        }

        @Override
        public void bar() {
            this.jsiiCall("bar", Void.class);
        }

        @Override
        public void foo() {
            this.jsiiCall("foo", Void.class);
        }
    }
}
