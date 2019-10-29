package org.yanex.hello

/**
 * Even friendlier classes can implement this interface.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.483Z")
interface IFriendlier: software.amazon.jsii.JsiiSerializable, org.yanex.hello.IFriendly {
    /**
     * Say farewell.
     */
    fun farewell(): kotlin.String {
        this.jsiiCall("farewell", kotlin.String::class.java)
    }

    /**
     * Say goodbye.
     * 
     * @return A goodbye blessing.
     */
    fun goodbye(): kotlin.String {
        this.jsiiCall("goodbye", kotlin.String::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IFriendlier {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
        }

        /**
         * Say hello!
         */
        fun hello(): kotlin.String {
            this.jsiiCall("hello", kotlin.String::class.java)
        }

        /**
         * Say farewell.
         */
        fun farewell(): kotlin.String {
            this.jsiiCall("farewell", kotlin.String::class.java)
        }

        /**
         * Say goodbye.
         * 
         * @return A goodbye blessing.
         */
        fun goodbye(): kotlin.String {
            this.jsiiCall("goodbye", kotlin.String::class.java)
        }
    }
}
