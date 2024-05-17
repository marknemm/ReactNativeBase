/**
 * Capitalize the first letter of each word in a given {@link str}.
 *
 * @param str The string to capitalize the words of.
 * @returns The string with title casing applied.
 */
export function toTitleCase(str: string): string {
  return str
    ? str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
    : str;
}

/**
 * Get the capitalized initials of a given {@link str}.
 *
 * @param str The string to get the initials of.
 * @param count The max number of initials to return. Defaults to all initials.
 * @returns The initials of the string.
 */
export function toInitials(str: string, count = Infinity): string {
  return str
    ? str
      .split(' ')
      .filter((word) => !['a', 'an', 'is', 'of', 'the'].includes(word.toLocaleLowerCase()))
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, count)
      .join('')
    : str;
}
