package org.yanex.hello

/**
 * These are some arguments you can pass to a method.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.481Z")
interface Greetee: software.amazon.jsii.JsiiSerializable {
    /**
     * The name of the greetee.
     * 
     * Default: world
     */
    val name: kotlin.String?

    class Builder {
        /**
         * The name of the greetee.
         * 
         * Default: world
         */
        var name: kotlin.String?

        fun build(): org.yanex.hello.Greetee {
            val name = this.name
            return `Jsii$Proxy`(name)
        }
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.Greetee {
        /**
         * The name of the greetee.
         * 
         * Default: world
         */
        override val name: kotlin.String?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.name = this.jsiiCall("name", kotlin.String::class.java)
        }

        constructor(name: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.name = name
        }

        override fun hashCode(): Int {
            var result = this.name?.hashCode() ?: 0
            return result
        }

        override fun equals(other: Any?) {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as org.yanex.hello.Greetee
            if (name != other?.name) return false
            return true
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj["name"] = om.valueToTree(this.name)
            return obj
        }
    }
}
