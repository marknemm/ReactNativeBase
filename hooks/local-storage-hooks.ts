import { LSDataType, LSStateOptions } from '@interfaces/local-storage';
import { UseStateReturn } from '@interfaces/state';
import { getLSItem, onLSItemChange, setLSItem } from '@util/local-storage';
import { useEffect, useState } from 'react';

export { LSDataType, LSStateOptions };

/**
 * Custom hook to use a persistent state that is loaded from and stored to local storage.
 *
 * @template T The state type.
 * @param key The key of the persistent state.
 * @param options The options for the persistent state.
 * @returns An array containing the persistent local storage state and the state setter.
 */
export function useLSState<T = any>(key: string, options: LSStateOptions<T> = {}): UseStateReturn<T> {
  const [state, setState] = useState(getLSItem(key) ?? options?.defaultValue);
  const setStateWrapper = (value: T | ((prevState: T) => T)) => {
    setState(value);
    const newValue = (typeof value === 'function')
      ? (value as (prevState: T) => T)(state)
      : value;
    return (options?.persistOnSetState !== false)
      ? setLSItem<T>(key, newValue)
      : null;
  };

  useEffect(() =>
    ((options?.watchChanges !== false)
      ? onLSItemChange<T>(key, (value) => setState(value ?? options?.defaultValue), false, options?.dataType)
      : () => {}),
  [key, options?.dataType, options?.defaultValue, options?.watchChanges]);

  return [state, setStateWrapper];
}
