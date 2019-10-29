package org.yanex.hello

/**
 * This is the first struct we have created in jsii.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.486Z")
interface MyFirstStruct: software.amazon.jsii.JsiiSerializable {
    /**
     * An awesome number value.
     */
    val anumber: kotlin.Number

    /**
     * A string value.
     */
    val astring: kotlin.String

    val firstOptional: kotlin.List<kotlin.String>?

    class Builder {
        /**
         * An awesome number value.
         */
        var anumber: kotlin.Number

        /**
         * A string value.
         */
        var astring: kotlin.String

        var firstOptional: kotlin.List<kotlin.String>?

        fun build(): org.yanex.hello.MyFirstStruct {
            val anumber = this.anumber ?: kotlin.error("Value for property 'anumber' must be specified")
            val astring = this.astring ?: kotlin.error("Value for property 'astring' must be specified")
            val firstOptional = this.firstOptional
            return `Jsii$Proxy`(anumber, astring, firstOptional)
        }
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.MyFirstStruct {
        /**
         * An awesome number value.
         */
        override val anumber: kotlin.Number

        /**
         * A string value.
         */
        override val astring: kotlin.String

        override val firstOptional: kotlin.List<kotlin.String>?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.anumber = this.jsiiCall("anumber", kotlin.Number::class.java)
            this.astring = this.jsiiCall("astring", kotlin.String::class.java)
            this.firstOptional = this.jsiiCall("firstOptional", kotlin.List::class.java)
        }

        constructor(anumber: kotlin.Number, astring: kotlin.String, firstOptional: kotlin.List<kotlin.String>?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.anumber = anumber
            this.astring = astring
            this.firstOptional = firstOptional
        }

        override fun hashCode(): Int {
            var result = this.anumber.hashCode()
            result = 31 * result + (this.astring.hashCode())
            result = 31 * result + (this.firstOptional?.hashCode() ?: 0)
            return result
        }

        override fun equals(other: Any?) {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as org.yanex.hello.MyFirstStruct
            if (anumber != other?.anumber) return false
            if (astring != other?.astring) return false
            if (firstOptional != other?.firstOptional) return false
            return true
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj["anumber"] = om.valueToTree(this.anumber)
            obj["astring"] = om.valueToTree(this.astring)
            obj["firstOptional"] = om.valueToTree(this.firstOptional)
            return obj
        }
    }
}
