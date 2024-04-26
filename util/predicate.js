/**
 * Resolves a predicate to a boolean value.
 *
 * @param {boolean | (() => boolean)} predicate The predicate value or function.
 * @returns {boolean} The resolved predicate value.
 */
export function resolvePredicate(predicate) {
  return typeof predicate === 'function'
    ? predicate()
    : predicate ?? false;
}
