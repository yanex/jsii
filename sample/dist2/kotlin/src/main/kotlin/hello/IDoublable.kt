package org.yanex.hello

/**
 * The general contract for a concrete number.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.483Z")
interface IDoublable: software.amazon.jsii.JsiiSerializable {
    val doubleValue: kotlin.Number

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IDoublable {
        override val doubleValue: kotlin.Number

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.doubleValue = this.jsiiCall("doubleValue", kotlin.Number::class.java)
        }
    }
}
