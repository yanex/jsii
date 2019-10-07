import crypto = require('crypto');
import { TypeScriptSnippet } from './snippets';

/**
 * Determine the key for a code block
 */
export function snippetKey(codeblock: TypeScriptSnippet) {
  const h = crypto.createHash('sha256');
  h.update(codeblock.source);
  return h.digest('hex');
}