package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.485Z")
interface IVery: software.amazon.jsii.JsiiSerializable {
    fun hey(): kotlin.Number {
        this.jsiiCall("hey", kotlin.Number::class.java)
    }

    fun hoo(a: kotlin.Number): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            this.a ?: error("'a' is required"),

        this.jsiiCall("hoo", kotlin.Number::class.java, args)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IVery {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
        }

        fun hey(): kotlin.Number {
            this.jsiiCall("hey", kotlin.Number::class.java)
        }

        fun hoo(a: kotlin.Number): kotlin.Number {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                this.a ?: error("'a' is required"),

            this.jsiiCall("hoo", kotlin.Number::class.java, args)
        }
    }
}
