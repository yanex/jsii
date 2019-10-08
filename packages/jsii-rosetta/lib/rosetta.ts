import fs = require('fs-extra');
import path = require('path');
import spec = require('jsii-spec');
import { DEFAULT_TABLET_NAME, LanguageTablet, Snippet, Translation } from "./tablets/tablets";
import { allTypeScriptSnippets } from './jsii/assemblies';
import { TargetLanguage } from './languages';
import { Translator, printDiagnostics } from './translate';
import { snippetKey } from './tablets/key';
import { isError } from 'util';
import { transformMarkdown } from './markdown/markdown';
import { MarkdownRenderer } from './markdown/markdown-renderer';
import { ReplaceCodeTransform, CodeBlock } from './markdown/replace-code-renderer';

export interface RosettaOptions {
  /**
   * Whether or not to live-convert samples
   *
   * @default false
   */
  liveConversion?: boolean;
}

/**
 * Entry point class for consumers for Rosetta functionality
 *
 * Rosetta can work in one of two modes:
 *
 * 1. Live translation of snippets.
 * 2. Read translations from a pre-translated tablet.
 *
 * The second method affords more control over the precise circumstances of
 * sample compilation and is recommended, but the first method is
 */
export class Rosetta {
  private readonly loadedTablets: LanguageTablet[] = [];
  private readonly liveTablet = new LanguageTablet();
  private readonly translator = new Translator(false);

  constructor(private readonly options: RosettaOptions) {
  }

  public get diagnostics() {
    return this.translator.diagnostics;
  }

  /**
   * Load a tablet as a source for translateable snippets
   */
  public async loadTablet(tabletFile: string) {
    const tablet = new LanguageTablet();
    await tablet.load(tabletFile);
    this.loadedTablets.push(tablet);
  }

  /**
   * Add an assembly
   *
   * If a default tablet file is found in the assembly's directory, it will be
   * loaded.
   *
   * Otherwise, if live conversion is enabled, the snippets in the assembly
   * become available for live translation later.
   *
   * (We do it like this to centralize the logic around the "where" calculation,
   * otherwise each language generator has to reimplement a way to describe API
   * elements while spidering the jsii assembly).
   */
  public async addAssembly(assembly: spec.Assembly, assemblyDir?: string) {
    if (assemblyDir && await fs.pathExists(path.join(assemblyDir, DEFAULT_TABLET_NAME))) {
      await this.loadTablet(path.join(assemblyDir, DEFAULT_TABLET_NAME));
      return;
    }

    if (this.options.liveConversion) {
      for (const tsnip of allTypeScriptSnippets([{ assembly }])) {
        this.liveTablet.addSnippet(Snippet.fromSource(tsnip));
      }
    }
  }

  public translateSnippet(source: string, targetLang: TargetLanguage): Translation | undefined {
    // Look for it in loaded tablets
    for (const tab of this.loadedTablets) {
      const ret = tab.lookup(source, targetLang);
      if (ret !== undefined) { return ret; }
    }

    // See if we're going to live-convert it
    const liveSnippet = this.liveTablet.getSnippet(snippetKey(source));
    if (liveSnippet !== undefined) {
      let trans = liveSnippet.get(targetLang);
      if (trans !== undefined) { return trans; }
      return this.translator.addTranslationFor(liveSnippet, targetLang);
    }

    return undefined;
  }

  public translateSnippetsInMarkdown(markdown: string, targetLang: TargetLanguage, translationToCodeBlock: (x: Translation) => CodeBlock = id): string {
    return transformMarkdown(markdown, new MarkdownRenderer(), new ReplaceCodeTransform(code => {
      if (code.language !== 'typescript' && code.language !== 'ts') { return code; }

      const translated = this.translateSnippet(code.source, targetLang);
      if (!translated) { return code; }

      return translationToCodeBlock(translated);
    }));
  }

  public printDiagnostics(stream: NodeJS.WritableStream) {
    printDiagnostics(this.diagnostics, stream);
  }

  public get hasErrors() {
    return this.diagnostics.some(isError);
  };
}


function id(x: Translation) { return x; }