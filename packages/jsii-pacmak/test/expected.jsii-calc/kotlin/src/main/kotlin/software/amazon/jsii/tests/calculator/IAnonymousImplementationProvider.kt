package software.amazon.jsii.tests.calculator

/**
 * We can return an anonymous interface implementation from an override without losing the interface declarations.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IAnonymousImplementationProvider : software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun provideAsClass(): software.amazon.jsii.tests.calculator.Implementation

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun provideAsInterface(): software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.calculator.IAnonymousImplementationProvider {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun provideAsClass(): software.amazon.jsii.tests.calculator.Implementation {
            return this.jsiiCall("provideAsClass", software.amazon.jsii.tests.calculator.Implementation::class.java) ?: error("Method 'provideAsClass()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun provideAsInterface(): software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe {
            return this.jsiiCall("provideAsInterface", software.amazon.jsii.tests.calculator.IAnonymouslyImplementMe::class.java) ?: error("Method 'provideAsInterface()' returned null value")
        }
    }
}
