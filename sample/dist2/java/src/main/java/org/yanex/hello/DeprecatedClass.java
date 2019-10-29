package org.yanex.hello;

/**
 * @deprecated a pretty boring class
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.406Z")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.DeprecatedClass")
public class DeprecatedClass extends software.amazon.jsii.JsiiObject {

    protected DeprecatedClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DeprecatedClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @deprecated this constructor is "just" okay
     * @param readonlyString This parameter is required.
     * @param mutableNumber
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public DeprecatedClass(final java.lang.String readonlyString, final java.lang.Number mutableNumber) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required"), mutableNumber }));
    }

    /**
     * @deprecated this constructor is "just" okay
     * @param readonlyString This parameter is required.
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public DeprecatedClass(final java.lang.String readonlyString) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required") }));
    }

    /**
     * @deprecated it was a bad idea
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public void method() {
        this.jsiiCall("method", Void.class);
    }

    /**
     * @deprecated this is not always "wazoo", be ready to be disappointed
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    /**
     * @deprecated shouldn't have been mutable
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public java.lang.Number getMutableProperty() {
        return this.jsiiGet("mutableProperty", java.lang.Number.class);
    }

    /**
     * @deprecated shouldn't have been mutable
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public void setMutableProperty(final java.lang.Number value) {
        this.jsiiSet("mutableProperty", value);
    }
}
