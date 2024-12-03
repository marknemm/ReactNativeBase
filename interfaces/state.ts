import { GestureResponderEvent } from 'react-native';

/**
 * A function that can be used to update the state of a `useState` hook.
 *
 * @template T The state type.
 */
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Options for the `useControlledState` hook.
 *
 * @template T The state type.
 */
export type UseControlledStateOptions<T = any> = {

  /**
   * The initial value of the controlled state.
   */
  initValue?: T;

  /**
   * Whether to only set the state if the control value itself has changed.
   *
   * `Note`: The value will always only be set if it differs from the current state value.
   * This additionally requires the control value to be different from its previous value.
   *
   * @default false
   */
  onlyOnControlValueChange?: boolean;

};

/**
 * Return value of the `useControlledToggleState` hook.
 *
 * First value is the state value.
 *
 * Second value is the toggle function.
 */
export type UseControlledToggleStateReturn<Event = GestureResponderEvent> = [boolean, React.Dispatch<Event>];

/**
 * Return value of the `useIncrementState` hook.
 *
 * First value is the state value.
 *
 * Second value is the increment function, which can take an optional increment amount.
 *
 * Third value is the decrement function, which can take an optional decrement amount.
 */
export type UseIncrementStateReturn = [
  number,
  (increment?: number) => void,
  (decrement?: number) => void,
];

/**
 * Return value of the `useState` hook.
 *
 * First value is the state value.
 *
 * Second value is the state setter function.
 *
 * @template T The state type.
 */
export type UseStateReturn<T = any> = [T, StateSetter<T>];

/**
 * Return value of the `useToggleState` hook.
 *
 * First value is the state value.
 *
 * Second value is the toggle function.
 */
export type UseToggleStateReturn = [boolean, React.Dispatch<void>];
