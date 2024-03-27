/**
 * Exclude private fields from JSON serialization.
 *
 * @param {string} key The field key.
 * @param {any} value The field value.
 * @returns {any} The field value or `undefined` if private.
 */
export function excludePrivateFields(key, value) {
  if (key.startsWith('_')) {
    return undefined;
  }

  return value;
}
