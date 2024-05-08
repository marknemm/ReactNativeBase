import { useCallback, useRef } from 'react';

/**
 * Custom hook that creates a debounce function.
 *
 * @param timeout The debounce timeout in milliseconds.
 * @returns The debounce function, which debounces a callback function.
 */
export function useDebounce(timeout: number): (callback: () => any) => void {
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
 * @template T The callback function type.
 * @param callback The callback function.
 * @param timeout The debounce timeout in milliseconds.
 * @returns The debounced callback function.
 */
export function useDebounced<T extends((...args: any[]) => any)>(callback: T, timeout: number): T {
  const debounce = useDebounce(timeout);
  return useCallback((...args: any[]) => debounce(() => callback(...args)), [callback, debounce]) as T;
}
