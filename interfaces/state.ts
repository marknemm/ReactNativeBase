import { GestureResponderEvent } from 'react-native';

/**
 * A function that can be used to update the state of a `useState` hook.
 *
 * @template T The state type.
 */
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Return value of the `useControlledToggleState` hook.
 */
export type UseControlledToggleStateReturn<Event = GestureResponderEvent> = [boolean, React.Dispatch<Event>];

/**
 * Return value of the `useState` hook.
 *
 * @template T The state type.
 */
export type UseStateReturn<T = any> = [T, StateSetter<T>];

/**
 * Return value of the `useToggleState` hook.
 */
export type UseToggleStateReturn = [boolean, React.Dispatch<void>];
