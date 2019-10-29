package org.yanex.hello;

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.411Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.JSII417PublicBaseOfBase")
public class JSII417PublicBaseOfBase extends software.amazon.jsii.JsiiObject {

    protected JSII417PublicBaseOfBase(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected JSII417PublicBaseOfBase(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public JSII417PublicBaseOfBase() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    public static org.yanex.hello.JSII417PublicBaseOfBase makeInstance() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(org.yanex.hello.JSII417PublicBaseOfBase.class, "makeInstance", org.yanex.hello.JSII417PublicBaseOfBase.class);
    }

    public void foo() {
        this.jsiiCall("foo", Void.class);
    }

    public java.lang.Boolean getHasRoot() {
        return this.jsiiGet("hasRoot", java.lang.Boolean.class);
    }
}
