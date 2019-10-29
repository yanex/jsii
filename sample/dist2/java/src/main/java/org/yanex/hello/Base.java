package org.yanex.hello;

/**
 * A base class.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.401Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Base")
public abstract class Base extends software.amazon.jsii.JsiiObject {

    protected Base(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Base(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected Base() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * @return the name of the class (to verify native type names are created for derived classes).
     */
    public java.lang.Object typeName() {
        return this.jsiiCall("typeName", java.lang.Object.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends org.yanex.hello.Base {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }
    }
}
