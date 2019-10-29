package software.amazon.jsii.tests.calculator.lib

class `$Module`: software.amazon.jsii.JsiiModule("@scope/jsii-calc-lib", "0.21.1", `$Module`::class.java, "jsii-calc-lib@0.21.1.jsii.tgz") {
    override fun resolveClass(fqn: String?): Class<*> {
        return when (fqn) {
            "@scope/jsii-calc-lib.EnumFromScopedModule" -> software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule::class.java
            "@scope/jsii-calc-lib.IDoublable" -> software.amazon.jsii.tests.calculator.lib.IDoublable::class.java
            "@scope/jsii-calc-lib.IFriendly" -> software.amazon.jsii.tests.calculator.lib.IFriendly::class.java
            "@scope/jsii-calc-lib.IThreeLevelsInterface" -> software.amazon.jsii.tests.calculator.lib.IThreeLevelsInterface::class.java
            "@scope/jsii-calc-lib.MyFirstStruct" -> software.amazon.jsii.tests.calculator.lib.MyFirstStruct::class.java
            "@scope/jsii-calc-lib.Number" -> software.amazon.jsii.tests.calculator.lib.Number::class.java
            "@scope/jsii-calc-lib.Operation" -> software.amazon.jsii.tests.calculator.lib.Operation::class.java
            "@scope/jsii-calc-lib.StructWithOnlyOptionals" -> software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals::class.java
            "@scope/jsii-calc-lib.Value" -> software.amazon.jsii.tests.calculator.lib.Value::class.java
            else -> throw ClassNotFoundException("Unknown JSII type: $fqn")
        }
    }
}
