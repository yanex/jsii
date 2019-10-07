import cm = require('commonmark');
import { TypeScriptSnippet } from '../tablets/snippets';
import { visitCommonMarkTree } from '../markdown/markdown';
import { ReplaceCodeTransform } from '../markdown/replace-code-renderer';

export interface TypeScriptSnippet {
  source: string;
  where: string;
}

export function extractTypescriptSnippetsFromMarkdown(markdown: string, wherePrefix: string): TypeScriptSnippet[] {
  const parser = new cm.Parser();
  const doc = parser.parse(markdown);

  const ret: TypeScriptSnippet[] = [];

  visitCommonMarkTree(doc, new ReplaceCodeTransform((block) => {
    if (block.language.startsWith('typescript') || block.language.startsWith('ts')) {
      ret.push({
        source: block.source,
        where: addSnippetNumber(wherePrefix, ret.length + 1),
      });
    }
    return block;
  }));

  return ret;
}

function addSnippetNumber(prefix: string, snippetNumber: number) {
  // First snippet (most cases) will not be numbered
  if (snippetNumber === 1) { return prefix; }

  return `${prefix}-snippet${snippetNumber}`;
}