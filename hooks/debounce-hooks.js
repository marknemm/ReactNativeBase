import { useCallback, useRef } from 'react';

/**
 * Debounce hook that creates a debounce function.
 *
 * @param {number} timeout The debounce timeout in milliseconds.
 * @returns {(callback: Function) => void} The debounce function, which debounces a callback function.
 */
export function useDebounce(timeout) {
  const timeoutRef = useRef(null);

  return useCallback((cb) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (cb && timeout != null) {
      timeoutRef.current = setTimeout(cb, timeout);
    }
  }, [timeout]);
}

/**
 * Debounce hook that creates a debounced callback function.
 *
 * @param {Function} callback The callback function.
 * @param {number} timeout The debounce timeout in milliseconds.
 * @returns {Function} The debounced callback function.
 */
export function useDebounced(callback, timeout) {
  const debounce = useDebounce(timeout);
  return useCallback((...args) => debounce(() => callback(...args)), [callback, debounce]);
}
