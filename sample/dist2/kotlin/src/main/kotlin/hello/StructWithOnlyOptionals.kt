package org.yanex.hello

/**
 * This is a struct with only optional properties.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.487Z")
interface StructWithOnlyOptionals: software.amazon.jsii.JsiiSerializable {
    /**
     * The first optional!
     */
    val optional1: kotlin.String?

    val optional2: kotlin.Number?

    val optional3: kotlin.Boolean?

    class Builder {
        /**
         * The first optional!
         */
        var optional1: kotlin.String?

        var optional2: kotlin.Number?

        var optional3: kotlin.Boolean?

        fun build(): org.yanex.hello.StructWithOnlyOptionals {
            val optional1 = this.optional1
            val optional2 = this.optional2
            val optional3 = this.optional3
            return `Jsii$Proxy`(optional1, optional2, optional3)
        }
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.StructWithOnlyOptionals {
        /**
         * The first optional!
         */
        override val optional1: kotlin.String?

        override val optional2: kotlin.Number?

        override val optional3: kotlin.Boolean?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.optional1 = this.jsiiCall("optional1", kotlin.String::class.java)
            this.optional2 = this.jsiiCall("optional2", kotlin.Number::class.java)
            this.optional3 = this.jsiiCall("optional3", kotlin.Boolean::class.java)
        }

        constructor(optional1: kotlin.String?, optional2: kotlin.Number?, optional3: kotlin.Boolean?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.optional1 = optional1
            this.optional2 = optional2
            this.optional3 = optional3
        }

        override fun hashCode(): Int {
            var result = this.optional1?.hashCode() ?: 0
            result = 31 * result + (this.optional2?.hashCode() ?: 0)
            result = 31 * result + (this.optional3?.hashCode() ?: 0)
            return result
        }

        override fun equals(other: Any?) {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as org.yanex.hello.StructWithOnlyOptionals
            if (optional1 != other?.optional1) return false
            if (optional2 != other?.optional2) return false
            if (optional3 != other?.optional3) return false
            return true
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj["optional1"] = om.valueToTree(this.optional1)
            obj["optional2"] = om.valueToTree(this.optional2)
            obj["optional3"] = om.valueToTree(this.optional3)
            return obj
        }
    }
}
