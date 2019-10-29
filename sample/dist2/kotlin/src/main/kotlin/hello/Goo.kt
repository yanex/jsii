package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.481Z")
interface Goo: software.amazon.jsii.JsiiSerializable {
    val foo: kotlin.String

    class Builder {
        var foo: kotlin.String

        fun build(): org.yanex.hello.Goo {
            val foo = this.foo ?: kotlin.error("Value for property 'foo' must be specified")
            return `Jsii$Proxy`(foo)
        }
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.Goo {
        override val foo: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.foo = this.jsiiCall("foo", kotlin.String::class.java)
        }

        constructor(foo: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.foo = foo
        }

        override fun hashCode(): Int {
            var result = this.foo.hashCode()
            return result
        }

        override fun equals(other: Any?) {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as org.yanex.hello.Goo
            if (foo != other?.foo) return false
            return true
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj["foo"] = om.valueToTree(this.foo)
            return obj
        }
    }
}
