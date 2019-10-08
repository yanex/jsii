import fs = require('fs-extra');
import ts = require('typescript');
import { AstConverter, AstHandler, ConvertOptions } from './converter';
import { transformMarkdown } from './markdown/markdown';
import { MarkdownRenderer } from './markdown/markdown-renderer';
import { ReplaceCodeTransform } from './markdown/replace-code-renderer';
import { OTree, renderTree } from './o-tree';
import { TypeScriptCompiler, CompilationResult } from './typescript/ts-compiler';
import { inTempDir } from './util';
import { TypeScriptSnippet } from './tablets/snippets';
import { Snippet } from './tablets/tablets';
import { TARGET_LANGUAGES, TargetLanguage } from './languages';

export interface Source {
  withFile<A>(fn: (fileName: string) => A): A;
  withContents<A>(fn: (fileName: string, contents: string) => A): A;
}

export class FileSource implements Source {
  constructor(private readonly fileName: string) { }

  public withFile<A>(fn: (fileName: string) => A): A {
    return fn(this.fileName);
  }

  public withContents<A>(fn: (fileName: string, contents: string) => A): A {
    const contents = fs.readFileSync(this.fileName, 'utf-8');
    return fn(this.fileName, contents);
  }
}

export class LiteralSource implements Source {
  constructor(private readonly source: string, private readonly filenameHint = 'index.ts') { }

  public withFile<A>(fn: (fileName: string) => A): A {
    return inTempDir(() => {
      fs.writeFileSync(this.filenameHint, this.source);
      return fn(this.filenameHint);
    });
  }

  public withContents<A>(fn: (fileName: string, contents: string) => A): A {
    return fn(this.filenameHint, this.source);
  }
}

export interface TranslateMarkdownOptions extends ConvertOptions {
  /**
   * What language to put in the returned markdown blocks
   */
  languageIdentifier?: string;
}

export function translateMarkdown(markdown: Source, visitor: AstHandler<any>, options: TranslateMarkdownOptions = {}): TranslateResult {
  const compiler = new TypeScriptCompiler();

  let index = 0;
  const translateDiagnostics = new Array<ts.Diagnostic>();
  const compileDiagnostics = new Array<ts.Diagnostic>();

  const translatedMarkdown = markdown.withContents((filename, contents) => {
    return transformMarkdown(contents, new MarkdownRenderer(), new ReplaceCodeTransform(code => {
      if (code.language !== 'typescript' && code.language !== 'ts') { return code; }

      index += 1;
      const snippetSource = new LiteralSource(code.source, `${filename}-snippet${index}.ts`);
      const snippetTranslation = translateSnippet(snippetSource, visitor, { ...options, compiler });

      translateDiagnostics.push(...snippetTranslation.translateDiagnostics);
      compileDiagnostics.push(...snippetTranslation.compileDiagnostics);

      return { language: options.languageIdentifier || '', source: renderTree(snippetTranslation.tree) + '\n' };
    }));
  });

  return { tree: new OTree([translatedMarkdown]), translateDiagnostics, compileDiagnostics };
}

export interface TranslateOptions extends ConvertOptions {
  /**
   * Re-use the given compiler if given
   */
  readonly compiler?: TypeScriptCompiler;

  /**
   * Include compiler errors in return diagnostics
   *
   * If false, only translation diagnostics will be returned.
   *
   * @default false
   */
  readonly includeCompilerDiagnostics?: boolean;
}

export function translateTypeScript(source: Source, visitor: AstHandler<any>, options: TranslateOptions = {}): TranslateResult {
  return translateSnippet(source, visitor, options);
}

function translateSnippet(source: Source, visitor: AstHandler<any>, options: TranslateOptions = {}): TranslateResult {
  const translator = new SnippetTranslator(source, options);
  const translated = translator.translateUsing(visitor);

  return {
    tree: translated,
    translateDiagnostics: translator.translateDiagnostics,
    compileDiagnostics: translator.compileDiagnostics
  };
}

export function printDiagnostics(diags: ts.Diagnostic[], stream: NodeJS.WritableStream) {
  diags.forEach(d => printDiagnostic(d, stream));
}

export function printDiagnostic(diag: ts.Diagnostic, stream: NodeJS.WritableStream) {
  const host = {
    getCurrentDirectory() { return '.'; },
    getCanonicalFileName(fileName: string) { return fileName; },
    getNewLine() { return '\n'; }
  };

  const message = ts.formatDiagnosticsWithColorAndContext([diag], host);
  stream.write(message);
}

export function isErrorDiagnostic(diag: ts.Diagnostic) {
  return diag.category === ts.DiagnosticCategory.Error;
}

/**
 * Hold some state across all translations
 */
export class Translator {
  private readonly compiler = new TypeScriptCompiler();
  private readonly translators: Record<string, SnippetTranslator> = {};

  constructor(private readonly includeCompilerDiagnostics: boolean) {
  }

  public translate(block: TypeScriptSnippet, languages = Object.keys(TARGET_LANGUAGES) as TargetLanguage[]) {
    const translator = this.translatorFor(block.source, block.where);

    const snippet = Snippet.fromSource(block, this.includeCompilerDiagnostics ? translator.compileDiagnostics.length === 0 : undefined);

    for (const lang of languages) {
      this.addTranslationFor(snippet, lang);
    }

    return snippet;
  }

  public addTranslationFor(snippet: Snippet, language: TargetLanguage) {
    const translator = this.translatorFor(snippet.originalSource.source, snippet.where);
    const languageConverterFactory = TARGET_LANGUAGES[language];
    const translated = renderTree(translator.translateUsing(languageConverterFactory()));
    return snippet.addTranslatedSource(language, translated);
  }

  public get diagnostics(): ts.Diagnostic[] {
    const ret = [];
    for (const t of Object.values(this.translators)) {
      ret.push(...t.diagnostics);
    }
    return ret;
  }


  private translatorFor(source: string, where: string) {
    const key = source + '-' + where;
    if (!(key in this.translators)) {
      const translator = new SnippetTranslator(new LiteralSource(source, where), {
        compiler: this.compiler,
        includeCompilerDiagnostics: this.includeCompilerDiagnostics,
      });

      this.diagnostics.push(...translator.compileDiagnostics);

      this.translators[key] = translator;
    }

    return this.translators[key];
  }
}

export interface TranslateResult {
  tree: OTree;
  translateDiagnostics: ts.Diagnostic[];
  compileDiagnostics: ts.Diagnostic[];
}

/**
 * Multiple conversion of the same snippet
 */
export class SnippetTranslator {
  public readonly translateDiagnostics: ts.Diagnostic[] = [];
  public readonly compileDiagnostics: ts.Diagnostic[] = [];
  private compilation!: CompilationResult;

  constructor(source: Source, private readonly options: TranslateOptions = {}) {
    const compiler = options.compiler || new TypeScriptCompiler();
    source.withContents((filename, contents) => {
      this.compilation = compiler.compileInMemory(filename, contents);
    });

    // This makes it about 5x slower, so only do it on demand
    if (options.includeCompilerDiagnostics) {
      const program = this.compilation.program;
      this.compileDiagnostics.push(...program.getGlobalDiagnostics(), ...program.getSyntacticDiagnostics(), ...program.getDeclarationDiagnostics(), ...program.getSemanticDiagnostics());
    }
  }

  public translateUsing(visitor: AstHandler<any>) {
    const converter = new AstConverter(this.compilation.rootFile, this.compilation.program.getTypeChecker(), visitor, this.options);
    const converted = converter.convert(this.compilation.rootFile);
    this.translateDiagnostics.push(...converter.diagnostics);
    return converted;
  }

  public get diagnostics() {
    return [...this.compileDiagnostics, ...this.translateDiagnostics];
  }
}
