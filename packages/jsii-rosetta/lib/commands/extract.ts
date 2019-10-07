import { loadAssemblies, allSnippetSources, LoadedAssembly } from '../jsii/assemblies';
import logging = require('../logging');
import { snippetKey } from '../tablets/key';
import { TARGET_LANGUAGES } from '../languages';
import { TypeScriptCompiler } from '../typescript/ts-compiler';
import { LiteralSource, SnippetTranslator } from '../translate';
import { renderTree } from '../o-tree';
import { SnippetSchema } from '../tablets/schema';
import ts = require('typescript');
import { TypeScriptSnippet, extractTypescriptSnippetsFromMarkdown } from '../tablets/snippets';
import { saveTablet, newTablet } from '../tablets/tablets';

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

  const tablet = newTablet();

  logging.info(`Translating`);
  const startTime = Date.now();

  let snippetCount = 0;
  for (const block of allTypeScriptCodeBlocks(assemblies)) {
    const key = snippetKey(block);
    logging.debug(`Translating ${key}`);
    tablet.snippets[key] = translator.translateSnippet(block);
    snippetCount++;
  }

  const delta =  (Date.now() - startTime) / 1000;
  logging.info(`Converted ${snippetCount} snippets in ${delta} seconds (${(delta / snippetCount).toPrecision(3)}s/snippet)`);
  logging.info(`Saving language tablet to ${outputFile}`);
  await saveTablet(tablet, outputFile);

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

  public translateSnippet(snippet: TypeScriptSnippet) {
    const ret: SnippetSchema = { translations: {} };

    ret.translations.$ = { source: snippet.source };

    const translator = new SnippetTranslator(new LiteralSource(snippet.source, snippet.where), {
      compiler: this.compiler,
      includeCompilerDiagnostics: this.includeCompilerDiagnostics,
    });

    for (const [lang, languageConverterFactory] of Object.entries(TARGET_LANGUAGES)) {
      const translated = translator.translateUsing(languageConverterFactory());
      ret.translations[lang] = { source: renderTree(translated) };
    }

    this.diagnostics.push(...translator.diagnostics);

    return ret;
  }
}

