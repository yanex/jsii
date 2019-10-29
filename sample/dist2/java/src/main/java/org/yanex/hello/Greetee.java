package org.yanex.hello;

/**
 * These are some arguments you can pass to a method.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.408Z")
public interface Greetee extends software.amazon.jsii.JsiiSerializable {

    /**
     * The name of the greetee.
     * 
     * Default: world
     */
    java.lang.String getName();

    /**
     * @return a {@link Builder} of {@link Greetee}
     */
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link Greetee}
     */
    public static final class Builder {
        private java.lang.String name;

        /**
         * Sets the value of Name
         * @param name The name of the greetee.
         * @return {@code this}
         */
        public Builder name(java.lang.String name) {
            this.name = name;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link Greetee}
         * @throws NullPointerException if any required attribute was not provided
         */
        public Greetee build() {
            return new Jsii$Proxy(name);
        }
    }

    /**
     * An implementation for {@link Greetee}
     */
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements Greetee {
        private final java.lang.String name;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.name = this.jsiiGet("name", java.lang.String.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String name) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.name = name;
        }

        @Override
        public java.lang.String getName() {
            return this.name;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            if (this.getName() != null) {
                obj.set("name", om.valueToTree(this.getName()));
            }
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Greetee.Jsii$Proxy that = (Greetee.Jsii$Proxy) o;

            return this.name != null ? this.name.equals(that.name) : that.name == null;
        }

        @Override
        public int hashCode() {
            int result = this.name != null ? this.name.hashCode() : 0;
            return result;
        }
    }
}
