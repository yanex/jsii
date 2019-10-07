import { loadAssemblies, allSnippetSources, LoadedAssembly } from '../jsii/assemblies';
import logging = require('../logging');
import { TARGET_LANGUAGES, TargetLanguage } from '../languages';
import { TypeScriptCompiler } from '../typescript/ts-compiler';
import { LiteralSource, SnippetTranslator } from '../translate';
import { renderTree } from '../o-tree';
import ts = require('typescript');
import { TypeScriptSnippet, extractTypescriptSnippetsFromMarkdown } from '../tablets/snippets';
import { LanguageTablet, Snippet } from '../tablets/tablets';

export interface ExtractResult {
  diagnostics: ts.Diagnostic[];
}

/**
 * Extract all samples from the given assemblies into a tablet
 */
export async function extractSnippets(assemblyLocations: string[], outputFile: string, includeCompilerDiagnostics: boolean): Promise<ExtractResult> {
  logging.info(`Loading ${assemblyLocations.length} assemblies`);
  const assemblies = await loadAssemblies(assemblyLocations);

  const translator = new Translator(includeCompilerDiagnostics);

  const tablet = new LanguageTablet();

  logging.info(`Translating`);
  const startTime = Date.now();

  for (const block of allTypeScriptCodeBlocks(assemblies)) {
    const snippet = Snippet.fromSource(block.source);
    logging.debug(`Translating ${snippet.key}`);
    translator.addTranslations(snippet, block.where);

    tablet.addSnippet(snippet);
  }

  const delta =  (Date.now() - startTime) / 1000;
  logging.info(`Converted ${tablet.count} snippets in ${delta} seconds (${(delta / tablet.count).toPrecision(3)}s/snippet)`);
  logging.info(`Saving language tablet to ${outputFile}`);
  await tablet.save(outputFile);

  return { diagnostics: translator.diagnostics };
}


function* allTypeScriptCodeBlocks(assemblies: LoadedAssembly[]): IterableIterator<TypeScriptSnippet> {
  for (const assembly of assemblies) {
    for (const source of allSnippetSources(assembly.assembly)) {
      switch (source.type) {
        case 'literal':
          yield { source: source.source, where: source.where };
          break;
        case 'markdown':
          yield* extractTypescriptSnippetsFromMarkdown(source.markdown, source.where);
      }
    }
  }
}

/**
 * Hold some state across all translations
 */
class Translator {
  private readonly compiler = new TypeScriptCompiler();
  public readonly diagnostics: ts.Diagnostic[] = [];

  constructor(private readonly includeCompilerDiagnostics: boolean) {
  }

  public addTranslations(snippet: Snippet, where: string) {
    const translator = new SnippetTranslator(new LiteralSource(snippet.originalSource, where), {
      compiler: this.compiler,
      includeCompilerDiagnostics: this.includeCompilerDiagnostics,
    });

    for (const [lang, languageConverterFactory] of Object.entries(TARGET_LANGUAGES)) {
      const translated = translator.translateUsing(languageConverterFactory());
      snippet.addTranslation(lang as TargetLanguage, renderTree(translated));
    }

    this.diagnostics.push(...translator.diagnostics);
  }
}

