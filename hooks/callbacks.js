import { useCallback } from 'react';

/**
 * Combines multiple callbacks into a single callback.
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
