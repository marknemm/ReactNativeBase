/**
 * {@link Predicate} type.
 */
export type Predicate = boolean | (() => boolean);

/**
 * Resolves a given {@link predicate} to a boolean value.
 *
 * @param predicate The {@link Predicate} value or function.
 * @returns The resolved predicate value.
 */
export function resolvePredicate(predicate: Predicate): boolean {
  return (typeof predicate === 'function')
    ? predicate()
    : predicate ?? false;
}
