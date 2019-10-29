package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.473Z")
interface BaseProps: software.amazon.jsii.JsiiSerializable, org.yanex.hello.VeryBaseProps {
    val bar: kotlin.String

    class Builder {
        var foo: org.yanex.hello.IVery

        var bar: kotlin.String

        fun build(): org.yanex.hello.BaseProps {
            val foo = this.foo ?: kotlin.error("Value for property 'foo' must be specified")
            val bar = this.bar ?: kotlin.error("Value for property 'bar' must be specified")
            return `Jsii$Proxy`(foo, bar)
        }
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.BaseProps {
        override val foo: org.yanex.hello.IVery

        override val bar: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.foo = this.jsiiCall("foo", org.yanex.hello.IVery::class.java)
            this.bar = this.jsiiCall("bar", kotlin.String::class.java)
        }

        constructor(foo: org.yanex.hello.IVery, bar: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.foo = foo
            this.bar = bar
        }

        override fun hashCode(): Int {
            var result = this.foo.hashCode()
            result = 31 * result + (this.bar.hashCode())
            return result
        }

        override fun equals(other: Any?) {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as org.yanex.hello.BaseProps
            if (foo != other?.foo) return false
            if (bar != other?.bar) return false
            return true
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj["foo"] = om.valueToTree(this.foo)
            obj["bar"] = om.valueToTree(this.bar)
            return obj
        }
    }
}
