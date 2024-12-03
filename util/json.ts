/**
 * Exclude private fields from JSON serialization.
 *
 * @param key The field key.
 * @param value The field value.
 * @returns The field value or `undefined` if private.
 */
export function excludePrivateFields<T>(key: string, value: T): T | undefined {
  if (key.startsWith('_')) {
    return undefined;
  }

  return value;
}
