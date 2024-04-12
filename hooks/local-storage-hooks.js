import { getLSItem, onLSItemChange, setLSItem } from '@util/local-storage';
import { useEffect, useState } from 'react';

/**
 * A hook to use a persistent state that is loaded from and stored to local storage.
 *
 * @param {string} key The key of the persistent state.
 * @param {Object} options The options for the persistent state.
 * @param {Types.LocalStorage.LSDataType} [options.dataType='DataType.serialized'] The data type of the persistent state. Defaults to `'serialized'`.
 * @param {any} [options.defaultValue] The default value of the persistent state which shall be set after attempting to load non-existing state from local storage.
 * @param {boolean} [options.persistOnSetState=false] Whether to persist the state on set state. Defaults to `true`.
 * @param {boolean} [options.watchChanges=true] Whether to watch changes to the persistent state. Defaults to `true`.
 * @returns {[any, React.Dispatch<React.SetStateAction<any>>]} The persistent local storage state and the state setter.
 */
export function useLSState(key, options = {
  dataType: 'serialized',
  defaultValue: null,
  persistOnSetState: true,
  watchChanges: true,
}) {
  const [state, setState] = useState(getLSItem(key) ?? options?.defaultValue);
  const setStateWrapper = (value) => {
    setState(value);
    return options?.persistOnSetState !== false
      ? setLSItem(key, value)
      : null;
  };

  useEffect(() =>
    ((options?.watchChanges !== false)
      ? onLSItemChange(key, (value) => setState(value ?? options?.defaultValue), false, options?.dataType)
      : () => {}),
  [key, options?.dataType, options?.defaultValue, options?.watchChanges]);

  return [state, setStateWrapper];
}
