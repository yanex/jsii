package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.484Z")
interface IJSII417Derived: software.amazon.jsii.JsiiSerializable, org.yanex.hello.IJSII417PublicBaseOfBase {
    val propertyValue: kotlin.String

    fun bar() {
        this.jsiiCall("bar", kotlin.Any::class.java)
    }

    fun baz() {
        this.jsiiCall("baz", kotlin.Any::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IJSII417Derived {
        override val hasRoot: kotlin.Boolean

        override val propertyValue: kotlin.String

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.hasRoot = this.jsiiCall("hasRoot", kotlin.Boolean::class.java)
            this.propertyValue = this.jsiiCall("property", kotlin.String::class.java)
        }

        fun foo() {
            this.jsiiCall("foo", kotlin.Any::class.java)
        }

        fun bar() {
            this.jsiiCall("bar", kotlin.Any::class.java)
        }

        fun baz() {
            this.jsiiCall("baz", kotlin.Any::class.java)
        }
    }
}
