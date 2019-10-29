package org.yanex.hello;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.415Z")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.StableClass")
public class StableClass extends software.amazon.jsii.JsiiObject {

    protected StableClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected StableClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param readonlyString This parameter is required.
     * @param mutableNumber
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public StableClass(final java.lang.String readonlyString, final java.lang.Number mutableNumber) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required"), mutableNumber }));
    }

    /**
     * @param readonlyString This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public StableClass(final java.lang.String readonlyString) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(readonlyString, "readonlyString is required") }));
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void method() {
        this.jsiiCall("method", Void.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public java.lang.String getReadonlyProperty() {
        return this.jsiiGet("readonlyProperty", java.lang.String.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public java.lang.Number getMutableProperty() {
        return this.jsiiGet("mutableProperty", java.lang.Number.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public void setMutableProperty(final java.lang.Number value) {
        this.jsiiSet("mutableProperty", value);
    }
}
