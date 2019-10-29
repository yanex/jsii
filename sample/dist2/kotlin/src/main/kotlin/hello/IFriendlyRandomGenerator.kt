package org.yanex.hello

@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.484Z")
interface IFriendlyRandomGenerator: software.amazon.jsii.JsiiSerializable, org.yanex.hello.IRandomNumberGenerator, org.yanex.hello.IFriendly {
    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IFriendlyRandomGenerator {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
        }

        /**
         * Returns another random number.
         * 
         * @return A random number.
         */
        fun next(): kotlin.Number {
            this.jsiiCall("next", kotlin.Number::class.java)
        }

        /**
         * Say hello!
         */
        fun hello(): kotlin.String {
            this.jsiiCall("hello", kotlin.String::class.java)
        }
    }
}
