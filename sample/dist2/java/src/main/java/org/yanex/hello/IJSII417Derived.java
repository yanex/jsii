package org.yanex.hello;

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.410Z")
public interface IJSII417Derived extends software.amazon.jsii.JsiiSerializable, org.yanex.hello.IJSII417PublicBaseOfBase {

    java.lang.String getProperty();

    void bar();

    void baz();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements org.yanex.hello.IJSII417Derived {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        @Override
        public java.lang.String getProperty() {
            return this.jsiiGet("property", java.lang.String.class);
        }

        @Override
        public java.lang.Boolean getHasRoot() {
            return this.jsiiGet("hasRoot", java.lang.Boolean.class);
        }

        @Override
        public void bar() {
            this.jsiiCall("bar", Void.class);
        }

        @Override
        public void baz() {
            this.jsiiCall("baz", Void.class);
        }

        @Override
        public void foo() {
            this.jsiiCall("foo", Void.class);
        }
    }
}
