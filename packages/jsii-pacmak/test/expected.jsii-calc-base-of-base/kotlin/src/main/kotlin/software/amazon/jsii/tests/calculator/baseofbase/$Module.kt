package software.amazon.jsii.tests.calculator.baseofbase

class `$Module`: software.amazon.jsii.JsiiModule("@scope/jsii-calc-base-of-base", "0.21.1", `$Module`::class.java, "jsii-calc-base-of-base@0.21.1.jsii.tgz") {
    override fun resolveClass(fqn: String?): Class<*> {
        return when (fqn) {
            "@scope/jsii-calc-base-of-base.IVeryBaseInterface" -> software.amazon.jsii.tests.calculator.baseofbase.IVeryBaseInterface::class.java
            "@scope/jsii-calc-base-of-base.Very" -> software.amazon.jsii.tests.calculator.baseofbase.Very::class.java
            "@scope/jsii-calc-base-of-base.VeryBaseProps" -> software.amazon.jsii.tests.calculator.baseofbase.VeryBaseProps::class.java
            else -> throw ClassNotFoundException("Unknown JSII type: $fqn")
        }
    }
}
