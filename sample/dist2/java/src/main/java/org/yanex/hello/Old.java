package org.yanex.hello;

/**
 * Old class.
 * 
 * @deprecated Use the new class
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.415Z")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Old")
public class Old extends software.amazon.jsii.JsiiObject {

    protected Old(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Old(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public Old() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * Doo wop that thing.
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public void doAThing() {
        this.jsiiCall("doAThing", Void.class);
    }
}
