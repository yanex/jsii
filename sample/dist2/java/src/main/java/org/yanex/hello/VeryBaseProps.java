package org.yanex.hello;

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.417Z")
public interface VeryBaseProps extends software.amazon.jsii.JsiiSerializable {

    org.yanex.hello.Very getFoo();

    /**
     * @return a {@link Builder} of {@link VeryBaseProps}
     */
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link VeryBaseProps}
     */
    public static final class Builder {
        private org.yanex.hello.Very foo;

        /**
         * Sets the value of Foo
         * @param foo the value to be set. This parameter is required.
         * @return {@code this}
         */
        public Builder foo(org.yanex.hello.Very foo) {
            this.foo = foo;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link VeryBaseProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        public VeryBaseProps build() {
            return new Jsii$Proxy(foo);
        }
    }

    /**
     * An implementation for {@link VeryBaseProps}
     */
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements VeryBaseProps {
        private final org.yanex.hello.Very foo;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.foo = this.jsiiGet("foo", org.yanex.hello.Very.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(org.yanex.hello.Very foo) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.foo = java.util.Objects.requireNonNull(foo, "foo is required");
        }

        @Override
        public org.yanex.hello.Very getFoo() {
            return this.foo;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("foo", om.valueToTree(this.getFoo()));
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            VeryBaseProps.Jsii$Proxy that = (VeryBaseProps.Jsii$Proxy) o;

            return this.foo.equals(that.foo);
        }

        @Override
        public int hashCode() {
            int result = this.foo.hashCode();
            return result;
        }
    }
}
