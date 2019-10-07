import fs = require('fs-extra');
import { TabletSchema, SnippetSchema, TranslationSchema, ORIGINAL_SNIPPET_KEY } from './schema';
import { snippetKey } from './key';
import { TargetLanguage } from '../languages';

const TOOL_VERSION = require('../../package.json').version;

export const DEFAULT_TABLET_NAME = 'jsii.ltab';

/**
 * A tablet containing various snippets in multiple languages
 */
export class LanguageTablet {
  private readonly snippets: Record<string, Snippet> = {};

  public addSnippet(snippet: Snippet) {
    this.snippets[snippet.key] = snippet;
  }

  public get snippetKeys() {
    return Object.keys(this.snippets);
  }

  public getSnippet(key: string): Snippet | undefined {
    return this.snippets[key];
  }

  public lookup(typeScriptSource: string, language: TargetLanguage): string | undefined {
    const snippet = this.snippets[snippetKey(typeScriptSource)];
    return snippet && snippet.get(language);
  }

  public async load(filename: string) {
    const obj = await fs.readJson(filename, { encoding: 'utf-8' });

    if (!obj.toolVersion || !obj.snippets) {
      throw new Error(`File '${filename}' does not seem to be a Tablet file`);
    }
    if (obj.toolVersion !== TOOL_VERSION) {
      throw new Error(`Tablet file '${filename}' has been created with version '${obj.toolVersion}', cannot read with current version '${TOOL_VERSION}'`);
    }

    Object.assign(this.snippets, mapValues(obj.snippets, (schema: SnippetSchema) => Snippet.fromSchema(schema)));
  }

  public get count() {
    return Object.keys(this.snippets).length;
  }

  public async save(filename: string) {
    await fs.writeJson(filename, this.toSchema(), { encoding: 'utf-8', spaces: 2 });
  }

  private toSchema(): TabletSchema {
    return {
      version: '1',
      toolVersion: TOOL_VERSION,
      snippets: mapValues(this.snippets, s => s.toSchema())
    };
  }
}

export class Snippet {
  public static fromSchema(schema: SnippetSchema) {
    const ret = new Snippet();
    Object.assign(ret.translations, schema.translations);
    return ret;
  }

  public static fromSource(originalSource: string) {
    const ret = new Snippet();
    Object.assign(ret.translations, { [ORIGINAL_SNIPPET_KEY]: originalSource });
    return ret;
  }

  private readonly translations: Record<string, TranslationSchema> = {};
  private _key?: string;

  private constructor() {
  }

  public get key() {
    if (this._key === undefined) {
      this._key = snippetKey(this.originalSource);
    }
    return this._key;
  }

  public get originalSource() {
    return this.translations[ORIGINAL_SNIPPET_KEY].source;
  }

  public addTranslation(language: TargetLanguage, translation: string) {
    this.translations[language] = { source: translation };
  }

  public get languages(): TargetLanguage[] {
    return Object.keys(this.translations).filter(x => x !== ORIGINAL_SNIPPET_KEY) as TargetLanguage[];
  }

  public get(language: TargetLanguage): string | undefined {
    const t = this.translations[language];
    return t && t.source;
  }

  public toSchema(): SnippetSchema {
    return {
      translations: this.translations
    }
  }
}

function mapValues<A, B>(xs: Record<string, A>, fn: (x: A) => B): Record<string, B> {
  const ret: Record<string, B> = {};
  for (const [key, value] of Object.entries(xs)) {
    ret[key] = fn(value);
  }
  return ret;
}