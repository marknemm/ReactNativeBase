import { useCallback, useRef } from 'react';

/**
 * Custom hook that creates a debounce function.
 *
 * @param timeout The debounce timeout in milliseconds.
 * @returns The debounce function, which debounces a callback function.
 */
export function useDebounce(timeout: number): (callback: Function) => void {
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
 * Custom hook that creates a debounced callback function.
 *
 * @param {Function} callback The callback function.
 * @param {number} timeout The debounce timeout in milliseconds.
 * @returns {Function} The debounced callback function.
 */
export function useDebounced(callback: Function, timeout: number): Function {
  const debounce = useDebounce(timeout);
  return useCallback((...args: any[]) => debounce(() => callback(...args)), [callback, debounce]);
}
