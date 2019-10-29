package software.amazon.jsii.tests.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IFriendlyRandomGenerator : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.IRandomNumberGenerator, software.amazon.jsii.tests.calculator.lib.IFriendly {
    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        /**
         * Returns another random number.
         * 
         * @return A random number.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun next(): kotlin.Number {
            return this.jsiiCall("next", kotlin.Number::class.java) ?: error("Method 'next()' returned null value")
        }

        /**
         * Say hello!
         */
        @Deprecated("Declaration is deprecated.")
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override fun hello(): kotlin.String {
            return this.jsiiCall("hello", kotlin.String::class.java) ?: error("Method 'hello()' returned null value")
        }
    }
}
