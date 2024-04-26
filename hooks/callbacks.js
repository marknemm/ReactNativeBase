import { useCallback } from 'react';

/**
 * Combines multiple callbacks into a single callback.
 * If any of the callbacks are `null` or `undefined`, they are ignored.
 *
 * `Note`: If any of the callback function references change between renders, the combined callback must be recreated.
 * To prevent this, use the {@link useCallback} hook to memoize each given callback.
 *
 * @param {ReadonlyArray<((...args) => void)>} callbacks The callbacks to combine.
 * @returns {(...args) => void} The combined callback.
 */
export function useCallbacks(...callbacks) {
  return useCallback((...args) => {
    for (const callback of callbacks) {
      callback?.(...args);
    }
  }, callbacks);
}
