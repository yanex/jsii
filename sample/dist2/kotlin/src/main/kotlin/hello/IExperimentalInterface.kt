package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.483Z")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IExperimentalInterface: software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var mutableProperty: kotlin.Number?

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun method() {
        this.jsiiCall("method", kotlin.Any::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IExperimentalInterface {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var mutableProperty: kotlin.Number?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.mutableProperty = this.jsiiCall("mutableProperty", kotlin.Number::class.java)
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun method() {
            this.jsiiCall("method", kotlin.Any::class.java)
        }
    }
}
