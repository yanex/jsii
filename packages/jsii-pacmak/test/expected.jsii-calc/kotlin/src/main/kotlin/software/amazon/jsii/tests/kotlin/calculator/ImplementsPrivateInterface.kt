package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ImplementsPrivateInterface")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ImplementsPrivateInterface : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var privateValue: kotlin.String
        get() {
            return this.jsiiGet("private", kotlin.String::class.java) ?: error("'private' should be present")
        }
        set(v) {
            this.jsiiSet("private", v)
        }

}