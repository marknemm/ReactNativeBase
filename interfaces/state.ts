import { GestureResponderEvent } from 'react-native';

/**
 * A function that can be used to update the state of a `useState` hook.
 *
 * @template T The state type.
 */
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

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
