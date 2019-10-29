package org.yanex.hello

/**
 * Generates random numbers.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.484Z")
interface IRandomNumberGenerator: software.amazon.jsii.JsiiSerializable {
    /**
     * Returns another random number.
     * 
     * @return A random number.
     */
    fun next(): kotlin.Number {
        this.jsiiCall("next", kotlin.Number::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IRandomNumberGenerator {
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
    }
}
