import { loadAssemblies, allSnippetSources, LoadedAssembly } from './jsii/assemblies';
import { snippetKey } from './tablets/key';
import { TARGET_LANGUAGES } from './languages';
import { TypeScriptCompiler } from './typescript/ts-compiler';
import { translateTypeScript, LiteralSource } from './translate';
import { renderTree } from './o-tree';
import { SnippetSchema } from './tablets/schema';
import ts = require('typescript');
import { TypeScriptSnippet, extractTypescriptSnippetsFromMarkdown } from './tablets/snippets';

/**
 * Extract all samples from the given assemblies into a tablet
 */
export async function extractSnippets(assemblyLocations: string[], outputDirectory?: string) {
  const assemblies = await loadAssemblies(assemblyLocations);

  const translator = new Translator();

  const snippets: {[key: string]: SnippetSchema} = {};
  for (const block of allTypeScriptCodeBlocks(assemblies)) {
    snippets[snippetKey(block)] = translator.translateSnippet(block);
  }
}


function* allTypeScriptCodeBlocks(assemblies: LoadedAssembly[]): IterableIterator<TypeScriptSnippet> {
  for (const assembly of assemblies) {
    for (const source of allSnippetSources(assembly.assembly)) {
      switch (source.type) {
        case 'literal':
          yield { source: source.source, where: source.where };
          break;
        case 'markdown':
          yield* extractTypescriptSnippetsFromMarkdown(source.markdown, source.where + '-');
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

  public translateSnippet(snippet: TypeScriptSnippet) {
    const ret: SnippetSchema = { translations: {} };

    for (const [lang, visitorFactory] of Object.entries(TARGET_LANGUAGES)) {
      const visitor = visitorFactory();

      const source = new LiteralSource(snippet.source);
      const result = translateTypeScript(source, visitor, {
        compiler: this.compiler
      });

      this.diagnostics.push(...result.diagnostics);
      ret.translations[lang] = { source: renderTree(result.tree) };
    }

    return ret;
  }
}

