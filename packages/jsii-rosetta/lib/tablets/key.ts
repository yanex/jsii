import crypto = require('crypto');

/**
 * Determine the key for a code block
 */
export function snippetKey(source: string) {
  const h = crypto.createHash('sha256');
  h.update(source);
  return h.digest('hex');
}