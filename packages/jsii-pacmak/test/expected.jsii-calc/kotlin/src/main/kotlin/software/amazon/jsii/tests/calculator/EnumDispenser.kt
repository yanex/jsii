package software.amazon.jsii.tests.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.`$Module`::class, fqn = "jsii-calc.EnumDispenser")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class EnumDispenser : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun randomIntegerLikeEnum(): software.amazon.jsii.tests.calculator.AllTypesEnum {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.EnumDispenser::class.java, "randomIntegerLikeEnum", software.amazon.jsii.tests.calculator.AllTypesEnum::class.java) ?: error("Method 'randomIntegerLikeEnum()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun randomStringLikeEnum(): software.amazon.jsii.tests.calculator.StringEnum {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.EnumDispenser::class.java, "randomStringLikeEnum", software.amazon.jsii.tests.calculator.StringEnum::class.java) ?: error("Method 'randomStringLikeEnum()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
