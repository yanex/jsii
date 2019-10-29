package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.483Z")
@Deprecated(useless interface)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface IDeprecatedInterface: software.amazon.jsii.JsiiSerializable {
    @Deprecated(could be better)
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    var mutableProperty: kotlin.Number?

    @Deprecated(services no purpose)
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    fun method() {
        this.jsiiCall("method", kotlin.Any::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IDeprecatedInterface {
        @Deprecated(could be better)
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override var mutableProperty: kotlin.Number?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
            this.mutableProperty = this.jsiiCall("mutableProperty", kotlin.Number::class.java)
        }

        @Deprecated(services no purpose)
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        fun method() {
            this.jsiiCall("method", kotlin.Any::class.java)
        }
    }
}
