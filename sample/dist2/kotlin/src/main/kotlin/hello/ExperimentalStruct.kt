package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.480Z")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface ExperimentalStruct: software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val readonlyProperty: kotlin.String

    class Builder {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var readonlyProperty: kotlin.String

        fun build(): org.yanex.hello.ExperimentalStruct {
            val readonlyProperty = this.readonlyProperty ?: kotlin.error("Value for property 'readonlyProperty' must be specified")
            return `Jsii$Proxy`(readonlyProperty)
        }
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.ExperimentalStruct {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val readonlyProperty: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.readonlyProperty = this.jsiiCall("readonlyProperty", kotlin.String::class.java)
        }

        constructor(readonlyProperty: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.readonlyProperty = readonlyProperty
        }

        override fun hashCode(): Int {
            var result = this.readonlyProperty.hashCode()
            return result
        }

        override fun equals(other: Any?) {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as org.yanex.hello.ExperimentalStruct
            if (readonlyProperty != other?.readonlyProperty) return false
            return true
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj["readonlyProperty"] = om.valueToTree(this.readonlyProperty)
            return obj
        }
    }
}
