package org.yanex.hello

/**
 * Interface that inherits from packages 2 levels up the tree.
 * 
 * Their presence validates that .NET/Java/jsii-reflect can track all fields
 * far enough up the tree.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-29T17:33:08.485Z")
interface IThreeLevelsInterface: software.amazon.jsii.JsiiSerializable, org.yanex.hello.IBaseInterface {
    fun baz() {
        this.jsiiCall("baz", kotlin.Any::class.java)
    }

    internal class `Jsii$Proxy`: software.amazon.jsii.JsiiObject, org.yanex.hello.IThreeLevelsInterface {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.objRef = objRef
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
