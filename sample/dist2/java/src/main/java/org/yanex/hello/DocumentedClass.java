package org.yanex.hello;

/**
 * Here's the first line of the TSDoc comment.
 * 
 * This is the meat of the TSDoc comment. It may contain
 * multiple lines and multiple paragraphs.
 * 
 * Multiple paragraphs are separated by an empty line.
 */
@javax.annotation.Generated(value = "jsii-pacmak/0.19.0 (build 5d7824d)", date = "2019-10-28T18:25:08.407Z")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = org.yanex.hello.$Module.class, fqn = "hello.DocumentedClass")
public class DocumentedClass extends software.amazon.jsii.JsiiObject {

    protected DocumentedClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DocumentedClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public DocumentedClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * Greet the indicated person.
     * 
     * This will print out a friendly greeting intended for
     * the indicated person.
     * 
     * @return A number that everyone knows very well
     * @param greetee The person to be greeted.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public java.lang.Number greet(final org.yanex.hello.Greetee greetee) {
        return this.jsiiCall("greet", java.lang.Number.class, new Object[] { greetee });
    }

    /**
     * Greet the indicated person.
     * 
     * This will print out a friendly greeting intended for
     * the indicated person.
     * 
     * @return A number that everyone knows very well
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public java.lang.Number greet() {
        return this.jsiiCall("greet", java.lang.Number.class);
    }

    /**
     * Say ¡Hola!
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void hola() {
        this.jsiiCall("hola", Void.class);
    }
}
