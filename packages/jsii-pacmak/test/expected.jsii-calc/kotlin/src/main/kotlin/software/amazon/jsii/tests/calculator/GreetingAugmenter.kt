package software.amazon.jsii.tests.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.`$Module`::class, fqn = "jsii-calc.GreetingAugmenter")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class GreetingAugmenter : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun betterGreeting(friendly: software.amazon.jsii.tests.calculator.lib.IFriendly): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            friendly
        )
        return this.jsiiCall("betterGreeting", kotlin.String::class.java, args) ?: error("Method 'betterGreeting()' returned null value")
    }
}
