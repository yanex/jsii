package org.yanex.hello.composition;

/**
 * Abstract operation composed from an expression of other operations.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.417Z")
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.composition.CompositeOperation")
public abstract class CompositeOperation extends org.yanex.hello.Operation {

    protected CompositeOperation(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected CompositeOperation(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected CompositeOperation() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * String representation of the value.
     */
    @Override
    public java.lang.String toString() {
        return this.jsiiCall("toString", java.lang.String.class);
    }

    /**
     * The expression that this operation consists of. Must be implemented by derived classes.
     */
    public org.yanex.hello.Value getExpression() {
        return this.jsiiGet("expression", org.yanex.hello.Value.class);
    }

    /**
     * The value.
     */
    @Override
    public java.lang.Number getValue() {
        return this.jsiiGet("value", java.lang.Number.class);
    }

    /**
     * A set of postfixes to include in a decorated .toString().
     */
    public java.util.List<java.lang.String> getDecorationPostfixes() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("decorationPostfixes", java.util.List.class));
    }

    /**
     * A set of postfixes to include in a decorated .toString().
     */
    public void setDecorationPostfixes(final java.util.List<java.lang.String> value) {
        this.jsiiSet("decorationPostfixes", java.util.Objects.requireNonNull(value, "decorationPostfixes is required"));
    }

    /**
     * A set of prefixes to include in a decorated .toString().
     */
    public java.util.List<java.lang.String> getDecorationPrefixes() {
        return java.util.Collections.unmodifiableList(this.jsiiGet("decorationPrefixes", java.util.List.class));
    }

    /**
     * A set of prefixes to include in a decorated .toString().
     */
    public void setDecorationPrefixes(final java.util.List<java.lang.String> value) {
        this.jsiiSet("decorationPrefixes", java.util.Objects.requireNonNull(value, "decorationPrefixes is required"));
    }

    /**
     * The .toString() style.
     */
    public org.yanex.hello.composition.CompositeOperation.CompositionStringStyle getStringStyle() {
        return this.jsiiGet("stringStyle", org.yanex.hello.composition.CompositeOperation.CompositionStringStyle.class);
    }

    /**
     * The .toString() style.
     */
    public void setStringStyle(final org.yanex.hello.composition.CompositeOperation.CompositionStringStyle value) {
        this.jsiiSet("stringStyle", java.util.Objects.requireNonNull(value, "stringStyle is required"));
    }
    /**
     * Style of .toString() output for CompositeOperation.
     */
    @software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.composition.CompositeOperation.CompositionStringStyle")
    public enum CompositionStringStyle {
        /**
         * Normal string expression.
         */
        NORMAL,
        /**
         * Decorated string expression.
         */
        DECORATED,
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends org.yanex.hello.composition.CompositeOperation {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * The expression that this operation consists of. Must be implemented by derived classes.
         */
        @Override
        public org.yanex.hello.Value getExpression() {
            return this.jsiiGet("expression", org.yanex.hello.Value.class);
        }

        /**
         * The value.
         */
        @Override
        public java.lang.Number getValue() {
            return this.jsiiGet("value", java.lang.Number.class);
        }

        /**
         * String representation of the value.
         */
        @Override
        public java.lang.String toString() {
            return this.jsiiCall("toString", java.lang.String.class);
        }
    }
}
