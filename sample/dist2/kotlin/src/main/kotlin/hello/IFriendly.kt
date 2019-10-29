package org.yanex.hello

/**
 * Applies to classes that are considered friendly.
 * 
 * These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.483Z")
interface IFriendly: software.amazon.jsii.JsiiSerializable {
    /**
     * Say hello!
     */
    fun hello(): kotlin.String {
        this.jsiiCall("hello", kotlin.String::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IFriendly {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
        }

        /**
         * Say hello!
         */
        fun hello(): kotlin.String {
            this.jsiiCall("hello", kotlin.String::class.java)
        }
    }
}
