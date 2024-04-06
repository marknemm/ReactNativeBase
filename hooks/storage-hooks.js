import { useEffect, useState } from 'react';
import { getItem, setItem } from '@util/storage';

/**
 * A hook to use a persistent state that is loaded from and stored to local storage.
 *
 * @param {string} key The key of the persistent state.
 * @param {Object} options The options for the persistent state.
 * @param {any} [options.defaultValue] The default value of the persistent state which shall be set after attempting to load non-existing state from local storage.
 * @param {boolean} [options.persistOnSetState=false] Whether to persist the state on set state.
 * @param {any} [options.placeholderValue] The placeholder value of the persistent state which shall be set immediately before loading the state from local storage.
 * @returns {[any, React.Dispatch<React.SetStateAction<any>>]} The persistent state and the state setter.
 */
export function usePersistentState(key, options = {
  defaultValue: null,
  persistOnSetState: false,
  placeholderValue: null
}) {
  const [state, setState] = useState(options?.placeholderValue ?? null);
  const setStateWrapper = async (value) => {
    setState(value);
    return options?.persistOnSetState
      ? setItem(key, value)
      : null;
  };

  useEffect(() => {
    (async () => {
      const value = await getItem(key);
      setState(value ?? options?.defaultValue ?? null);
    })();
  }, [key, options?.defaultValue]);

  return [state, setStateWrapper];
}
