package org.yanex.hello

/**
 * Properties for Calculator.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.479Z")
interface CalculatorProps: software.amazon.jsii.JsiiSerializable {
    val initialValue: kotlin.Number?

    val maximumValue: kotlin.Number?

    class Builder {
        var initialValue: kotlin.Number?

        var maximumValue: kotlin.Number?

        fun build(): org.yanex.hello.CalculatorProps {
            val initialValue = this.initialValue
            val maximumValue = this.maximumValue
            return `Jsii$Proxy`(initialValue, maximumValue)
        }
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.CalculatorProps {
        override val initialValue: kotlin.Number?

        override val maximumValue: kotlin.Number?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.initialValue = this.jsiiCall("initialValue", kotlin.Number::class.java)
            this.maximumValue = this.jsiiCall("maximumValue", kotlin.Number::class.java)
        }

        constructor(initialValue: kotlin.Number?, maximumValue: kotlin.Number?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.initialValue = initialValue
            this.maximumValue = maximumValue
        }

        override fun hashCode(): Int {
            var result = this.initialValue?.hashCode() ?: 0
            result = 31 * result + (this.maximumValue?.hashCode() ?: 0)
            return result
        }

        override fun equals(other: Any?) {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as org.yanex.hello.CalculatorProps
            if (initialValue != other?.initialValue) return false
            if (maximumValue != other?.maximumValue) return false
            return true
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj["initialValue"] = om.valueToTree(this.initialValue)
            obj["maximumValue"] = om.valueToTree(this.maximumValue)
            return obj
        }
    }
}
