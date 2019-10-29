package org.yanex.hello;

import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("hello", "0.1.0", $Module.class, "hello@0.1.0.jsii.tgz");
    }

    @Override
    protected Class<?> resolveClass(final String fqn) throws ClassNotFoundException {
        switch (fqn) {
            case "hello.Add": return org.yanex.hello.Add.class;
            case "hello.Base": return org.yanex.hello.Base.class;
            case "hello.BaseProps": return org.yanex.hello.BaseProps.class;
            case "hello.BinaryOperation": return org.yanex.hello.BinaryOperation.class;
            case "hello.Calculator": return org.yanex.hello.Calculator.class;
            case "hello.CalculatorProps": return org.yanex.hello.CalculatorProps.class;
            case "hello.DeprecatedClass": return org.yanex.hello.DeprecatedClass.class;
            case "hello.DeprecatedEnum": return org.yanex.hello.DeprecatedEnum.class;
            case "hello.DeprecatedStruct": return org.yanex.hello.DeprecatedStruct.class;
            case "hello.DocumentedClass": return org.yanex.hello.DocumentedClass.class;
            case "hello.EnumFromScopedModule": return org.yanex.hello.EnumFromScopedModule.class;
            case "hello.ExperimentalClass": return org.yanex.hello.ExperimentalClass.class;
            case "hello.ExperimentalEnum": return org.yanex.hello.ExperimentalEnum.class;
            case "hello.ExperimentalStruct": return org.yanex.hello.ExperimentalStruct.class;
            case "hello.Greetee": return org.yanex.hello.Greetee.class;
            case "hello.IBaseInterface": return org.yanex.hello.IBaseInterface.class;
            case "hello.IDeprecatedInterface": return org.yanex.hello.IDeprecatedInterface.class;
            case "hello.IDoublable": return org.yanex.hello.IDoublable.class;
            case "hello.IExperimentalInterface": return org.yanex.hello.IExperimentalInterface.class;
            case "hello.IFriendlier": return org.yanex.hello.IFriendlier.class;
            case "hello.IFriendly": return org.yanex.hello.IFriendly.class;
            case "hello.IFriendlyRandomGenerator": return org.yanex.hello.IFriendlyRandomGenerator.class;
            case "hello.IJSII417Derived": return org.yanex.hello.IJSII417Derived.class;
            case "hello.IJSII417PublicBaseOfBase": return org.yanex.hello.IJSII417PublicBaseOfBase.class;
            case "hello.IJsii487External": return org.yanex.hello.IJsii487External.class;
            case "hello.IJsii487External2": return org.yanex.hello.IJsii487External2.class;
            case "hello.IJsii496": return org.yanex.hello.IJsii496.class;
            case "hello.IRandomNumberGenerator": return org.yanex.hello.IRandomNumberGenerator.class;
            case "hello.IStableInterface": return org.yanex.hello.IStableInterface.class;
            case "hello.IThreeLevelsInterface": return org.yanex.hello.IThreeLevelsInterface.class;
            case "hello.IVeryBaseInterface": return org.yanex.hello.IVeryBaseInterface.class;
            case "hello.JSII417Derived": return org.yanex.hello.JSII417Derived.class;
            case "hello.JSII417PublicBaseOfBase": return org.yanex.hello.JSII417PublicBaseOfBase.class;
            case "hello.Jsii487Derived": return org.yanex.hello.Jsii487Derived.class;
            case "hello.Jsii496Derived": return org.yanex.hello.Jsii496Derived.class;
            case "hello.Multiply": return org.yanex.hello.Multiply.class;
            case "hello.MyFirstStruct": return org.yanex.hello.MyFirstStruct.class;
            case "hello.Negate": return org.yanex.hello.Negate.class;
            case "hello.Number": return org.yanex.hello.Number.class;
            case "hello.Old": return org.yanex.hello.Old.class;
            case "hello.Operation": return org.yanex.hello.Operation.class;
            case "hello.Power": return org.yanex.hello.Power.class;
            case "hello.StableClass": return org.yanex.hello.StableClass.class;
            case "hello.StableEnum": return org.yanex.hello.StableEnum.class;
            case "hello.StableStruct": return org.yanex.hello.StableStruct.class;
            case "hello.StructWithOnlyOptionals": return org.yanex.hello.StructWithOnlyOptionals.class;
            case "hello.Sum": return org.yanex.hello.Sum.class;
            case "hello.UnaryOperation": return org.yanex.hello.UnaryOperation.class;
            case "hello.Value": return org.yanex.hello.Value.class;
            case "hello.Very": return org.yanex.hello.Very.class;
            case "hello.VeryBaseProps": return org.yanex.hello.VeryBaseProps.class;
            case "hello.composition.CompositeOperation": return org.yanex.hello.composition.CompositeOperation.class;
            case "hello.composition.CompositeOperation.CompositionStringStyle": return org.yanex.hello.composition.CompositeOperation.CompositionStringStyle.class;
            default: throw new ClassNotFoundException("Unknown JSII type: " + fqn);
        }
    }
}
