import { PreventableEvent } from '@interfaces/event';
import { UseControlledStateOptions, UseControlledToggleStateReturn, UseIncrementStateReturn, UseStateReturn, UseToggleStateReturn } from '@interfaces/state';
import mergeRefs from 'merge-refs';
import { useCallback, useMemo, useRef, useState } from 'react';
import { GestureResponderEvent } from 'react-native';

export * from '@interfaces/state';

/**
 * Custom hook that combines multiple callbacks into a single callback via {@link useCallback}.
 *
 * If any of the callbacks are `null` or `undefined`, they are ignored.
 *
 * `Note`: If any of the callback function references change between renders, the combined callback must be recreated.
 * To prevent this, use the {@link useCallback} hook to memoize each given callback.
 *
 * @template T The type of the callback function.
 * @param callbacks The callback functions to combine.
 * @returns The combined callback.
 */
export function useCallbacks<
  T extends((...args: any[]) => void)
>(...callbacks: ReadonlyArray<T>): T {
  return useCallback(((...args) => { // eslint-disable-line react-hooks/exhaustive-deps
    for (const callback of callbacks) {
      callback?.(...args);
    }
  }) as T, callbacks);
}

/**
 * Custom hook that generates controlled state that updates based off of an external {@link value} (e.g. a component property).
 *
 * @template T The type of the controlled state.
 * @param value The external control value.
 * @param options The {@link UseControlledStateOptions}.
 * @returns The controlled stateful value and a function to update it.
 */
export function useControlledState<T = any>(
  value: T,
  {
    initValue = value,
    onlyOnControlValueChange = false,
  }: UseControlledStateOptions<T> = {}
): UseStateReturn<T> {
  const [state, setState] = useState(initValue);
  const prevValueRef = useRef(initValue);

  if (value !== undefined && value !== state && (!onlyOnControlValueChange || value !== prevValueRef.current)) {
    setState(value);
    prevValueRef.current = value;
  }

  return [state, setState];
}

/**
 * Custom hook that generates controlled toggle state that updates based off of an external {@link value} (e.g. a component property).
 *
 * @template Event The type of the toggle event.
 * @param value The external control value.
 * @param onToggle The function to call to notify an external controller when the toggle state changes.
 * @param options The {@link UseControlledStateOptions}.
 * @returns The controlled toggle stateful value and a function to toggle it.
 */
export function useControlledToggleState<Event extends PreventableEvent = GestureResponderEvent>(
  value: boolean,
  onToggle: (event?: Event) => void,
  options: UseControlledStateOptions<boolean> = {}
): UseControlledToggleStateReturn<Event> {
  const [state, setState] = useControlledState(value, options);

  const toggleState = useCallback((event?: Event) => {
    onToggle?.(event);
    if (!(event?.isDefaultPrevented?.() ?? event?.defaultPrevented)) {
      setState((val) => !val);
    }
  }, [onToggle, setState]);

  return [state, toggleState];
}

/**
 * Custom hook that generates an increment state.
 *
 * @param value The initial value of the increment state.
 * @returns The stateful value and functions to increment and decrement it.
 */
export function useIncrementState(value: number): UseIncrementStateReturn {
  const [state, setState] = useState(value);

  const incrementState = useCallback((increment = 1) => {
    setState((val) => val + increment);
  }, []);

  const decrementState = useCallback((decrement = 1) => {
    setState((val) => val - decrement);
  }, []);

  return [state, incrementState, decrementState];
}

/**
 * Custom hook that merges multiple refs into a single ref.
 *
 * @template T The type of the ref.
 * @param refs The refs to merge.
 * @returns The merged ref.
 */
export function useMergedRefs<T = any>(...refs: ReadonlyArray<React.Ref<T>>): React.Ref<T> {
  return useMemo(() =>
    mergeRefs(...refs),
  [...refs]); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Custom hook that generates a toggle state.
 *
 * @param value The initial value of the toggle state.
 * @returns The stateful value and a function to toggle it.
 */
export function useToggleState(value: boolean): UseToggleStateReturn {
  const [state, setState] = useState(value);

  const toggleState = useCallback(() => {
    setState((val) => !val);
  }, []);

  return [state, toggleState];
}
