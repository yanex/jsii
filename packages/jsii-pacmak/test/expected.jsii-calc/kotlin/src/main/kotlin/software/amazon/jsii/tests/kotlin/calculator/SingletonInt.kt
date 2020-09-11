package software.amazon.jsii.tests.kotlin.calculator

/**
 * Verifies that singleton enums are handled correctly.
 * 
 * https://github.com/aws/jsii/issues/231
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.SingletonInt")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class SingletonInt : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun isSingletonInt(value: kotlin.Number): kotlin.Boolean {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        return this.jsiiCall("isSingletonInt", kotlin.Boolean::class.java, args) ?: error("Method 'isSingletonInt()' returned null value")
    }
}
