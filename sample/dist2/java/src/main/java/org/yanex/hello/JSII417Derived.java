package org.yanex.hello;

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.411Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.JSII417Derived")
public class JSII417Derived extends org.yanex.hello.JSII417PublicBaseOfBase {

    protected JSII417Derived(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JSII417Derived(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public JSII417Derived(final java.lang.String property) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(property, "property is required") }));
    }

    public void bar() {
        this.jsiiCall("bar", Void.class);
    }

    public void baz() {
        this.jsiiCall("baz", Void.class);
    }

    protected java.lang.String getProperty() {
        return this.jsiiGet("property", java.lang.String.class);
    }
}
