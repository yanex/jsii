package software.amazon.jsii.tests.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.`$Module`::class, fqn = "jsii-calc.AllowedMethodNames")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class AllowedMethodNames : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun getBar(_p1: kotlin.String, _p2: kotlin.Number) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            _p1,
            _p2
        )
        this.jsiiCall("getBar", kotlin.Unit::class.java, args) ?: error("Method 'getBar()' returned null value")
    }

    /**
     * getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun getFoo(withParam: kotlin.String): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            withParam
        )
        return this.jsiiCall("getFoo", kotlin.String::class.java, args) ?: error("Method 'getFoo()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun setBar(_x: kotlin.String, _y: kotlin.Number, _z: kotlin.Boolean) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            _x,
            _y,
            _z
        )
        this.jsiiCall("setBar", kotlin.Unit::class.java, args) ?: error("Method 'setBar()' returned null value")
    }

    /**
     * setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun setFoo(_x: kotlin.String, _y: kotlin.Number) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            _x,
            _y
        )
        this.jsiiCall("setFoo", kotlin.Unit::class.java, args) ?: error("Method 'setFoo()' returned null value")
    }
}
