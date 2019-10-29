package org.yanex.hello;

/**
 * An operation that sums multiple values.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.416Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Sum")
public class Sum extends org.yanex.hello.composition.CompositeOperation {

    protected Sum(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Sum(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public Sum() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * The expression that this operation consists of. Must be implemented by derived classes.
     */
    @Override
    public org.yanex.hello.Value getExpression() {
        return this.jsiiGet("expression", org.yanex.hello.Value.class);
    }

    /**
     * The parts to sum.
     */
    public java.util.List<org.yanex.hello.Value> getParts() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("parts", java.util.List.class));
    }

    /**
     * The parts to sum.
     */
    public void setParts(final java.util.List<org.yanex.hello.Value> value) {
        this.jsiiSet("parts", java.util.Objects.requireNonNull(value, "parts is required"));
    }
}
