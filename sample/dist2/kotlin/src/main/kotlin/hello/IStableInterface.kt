package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.484Z")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
interface IStableInterface: software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    var mutableProperty: kotlin.Number?

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    fun method() {
        this.jsiiCall("method", kotlin.Any::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IStableInterface {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        override var mutableProperty: kotlin.Number?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.mutableProperty = this.jsiiCall("mutableProperty", kotlin.Number::class.java)
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        fun method() {
            this.jsiiCall("method", kotlin.Any::class.java)
        }
    }
}
