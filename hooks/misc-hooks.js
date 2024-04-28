import { useCallback, useRef, useState } from 'react';

/**
 * Custom hook that combines multiple callbacks into a single callback.
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, callbacks);
}

/**
 * Custom hook that generates controlled state that updates based off of an external {@link value} (e.g. a component property).
 *
 * @template [T=any] The type of the controlled state.
 * @param {T} value The external control value.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} The controlled stateful value and a function to update it.
 */
export function useControlledState(value) {
  const prevValueRef = useRef(value);
  const [state, setState] = useState(value);

  if (prevValueRef.current !== value) {
    setState(value);
    prevValueRef.current = value;
  }

  return [state, setState];
}

/**
 * Custom hook that generates controlled toggle state that updates based off of an external {@link value} (e.g. a component property).
 *
 * @template [ToggleEvent=Types.GestureResponderEvent] The type of the toggle event.
 * @param {boolean} value The external control value.
 * @param {(event?: ToggleEvent) => void} onToggle The function to call to notify an external controller when the toggle state changes.
 * @returns {[boolean, (event?: ToggleEvent) => void]} The controlled toggle stateful value and a function to toggle it.
 */
export function useControlledToggleState(value, onToggle) {
  const [state, setState] = useControlledState(value);

  const toggleState = useCallback((event) => {
    onToggle?.(event);
    if (!(event?.isDefaultPrevented?.() ?? event?.defaultPrevented)) {
      setState((val) => !val);
    }
  }, [onToggle, setState]);

  return [state, toggleState];
}

/**
 * Custom hook that generates a toggle state.
 *
 * @param {boolean} value The initial value of the toggle state.
 * @returns {[boolean, () => void]} The stateful value and a function to toggle it.
 */
export function useToggleState(value) {
  const [state, setState] = useState(value);

  const toggleState = useCallback(() => {
    setState((val) => !val);
  }, []);

  return [state, toggleState];
}
