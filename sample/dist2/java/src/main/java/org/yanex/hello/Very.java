package org.yanex.hello;

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.417Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Very")
public class Very extends software.amazon.jsii.JsiiObject {

    protected Very(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Very(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public Very() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    public java.lang.Number hey() {
        return this.jsiiCall("hey", java.lang.Number.class);
    }
}
