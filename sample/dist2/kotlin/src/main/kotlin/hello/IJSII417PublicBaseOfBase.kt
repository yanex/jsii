package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.484Z")
interface IJSII417PublicBaseOfBase: software.amazon.jsii.JsiiSerializable {
    val hasRoot: kotlin.Boolean

    fun foo() {
        this.jsiiCall("foo", kotlin.Any::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IJSII417PublicBaseOfBase {
        override val hasRoot: kotlin.Boolean

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.hasRoot = this.jsiiCall("hasRoot", kotlin.Boolean::class.java)
        }

        fun foo() {
            this.jsiiCall("foo", kotlin.Any::class.java)
        }
    }
}
