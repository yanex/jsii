package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.486Z")
interface IVeryBaseInterface: software.amazon.jsii.JsiiSerializable {
    fun foo() {
        this.jsiiCall("foo", kotlin.Any::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IVeryBaseInterface {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
        }

        fun foo() {
            this.jsiiCall("foo", kotlin.Any::class.java)
        }
    }
}
