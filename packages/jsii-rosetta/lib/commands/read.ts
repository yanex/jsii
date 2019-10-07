import { loadTablet } from "../tablets/tablets";
import { ORIGINAL_SNIPPET_KEY, SnippetSchema, TranslationSchema } from "../tablets/schema";

export async function readTablet(tabletFile: string, key?: string, lang?: string) {
  const tab = await loadTablet(tabletFile);

  if (key !== undefined) {
    const snippet = tab.snippets[key];
    if (snippet === undefined) {
      throw new Error(`No such snippet: ${key}`);
    }
    displaySnippet(snippet);
  } else {
    listSnippets();
  }

  function listSnippets() {
    for (const [key, snippet] of Object.entries(tab.snippets)) {
      process.stdout.write(snippetHeader(key) + '\n');
      displaySnippet(snippet);
      process.stdout.write('\n');
    }
  }

  function displaySnippet(snippet: SnippetSchema) {
    if (lang !== undefined) {
      const translation = snippet.translations[lang];
      if (translation === undefined) {
        throw new Error(`No translation for ${lang} in this snippet`);
      }
      displayTranslation(translation);
    } else {
      listTranslations(snippet);
    }
  }

  function listTranslations(snippet: SnippetSchema) {
    const original = snippet.translations[ORIGINAL_SNIPPET_KEY];
    if (original !== undefined) {
      displayTranslation(original);
    }

    for (const [lang, translation] of Object.entries(snippet.translations)) {
      if (lang === ORIGINAL_SNIPPET_KEY) { continue; }
      process.stdout.write(languageHeader(lang) + '\n');
      displayTranslation(translation);
    }
  }

  function displayTranslation(translation: TranslationSchema) {
    process.stdout.write(translation.source + '\n');
  }
}

function snippetHeader(key: string) {
  return center(` ${key} `, 100, '=');
}

function languageHeader(key: string) {
  return center(` ${key} `, 30, '-');
}

function center(str: string, n: number, fill: string) {
  const before = Math.floor((n - str.length) / 2);
  const after = Math.ceil((n - str.length) / 2);

  return fill.repeat(Math.max(before, 0)) + str + fill.repeat(Math.max(after, 0));
}