package org.yanex.hello;

/**
 * The power operation.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.415Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.Power")
public class Power extends org.yanex.hello.composition.CompositeOperation {

    protected Power(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Power(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a Power operation.
     * 
     * @param base The base of the power. This parameter is required.
     * @param pow The number of times to multiply. This parameter is required.
     */
    public Power(final org.yanex.hello.Value base, final org.yanex.hello.Value pow) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(base, "base is required"), java.util.Objects.requireNonNull(pow, "pow is required") }));
    }

    /**
     * The base of the power.
     */
    public org.yanex.hello.Value getBase() {
        return this.jsiiGet("base", org.yanex.hello.Value.class);
    }

    /**
     * The expression that this operation consists of. Must be implemented by derived classes.
     */
    @Override
    public org.yanex.hello.Value getExpression() {
        return this.jsiiGet("expression", org.yanex.hello.Value.class);
    }

    /**
     * The number of times to multiply.
     */
    public org.yanex.hello.Value getPow() {
        return this.jsiiGet("pow", org.yanex.hello.Value.class);
    }
}
