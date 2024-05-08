import { MMKV } from 'react-native-mmkv';
import { LSDataType } from '@interfaces/local-storage';

export { LSDataType };

const changeListeners = new Map<string, Set<() => void>>();
const storage = new MMKV();

// Setup listener to invoke callbacks when specific items change.
storage.addOnValueChangedListener((key) =>
  changeListeners.get(key)?.forEach((callback) => callback())
);

/**
 * Gets an item from local persistent storage.
 *
 * @param key The key of the item to get.
 * @param dataType The {@link LSDataType LSDataType} of the item. Defaults to `'serialized'`.
 * @returns The item value or `null` if the item does not exist.
 */
export function getLSItem<T>(key: string, dataType: LSDataType = 'serialized'): T {
  switch (dataType) {
    case 'boolean': return storage.getBoolean(key) as any;
    case 'buffer':  return storage.getBuffer(key) as any;
    case 'number':  return storage.getNumber(key) as any;
    case 'string':  return storage.getString(key) as any;
    default: {
      const serializedValue = storage.getString(key);
      try { // Safely attempt to deserialize JSON string. Return raw serialized value if error.
        return serializedValue !== null ? JSON.parse(serializedValue) : null;
      } catch {
        return serializedValue === 'undefined' ? undefined : serializedValue as any;
      }
    }
  }
}

/**
 * Sets an item in local persistent storage.
 *
 * @param key The key of the item to store.
 * @param value The value of the item to store.
 */
export function setLSItem<T = any>(key: string, value: T) {
  if (typeof value === 'object') {
    const serializedValue = JSON.stringify(value);
    storage.set(key, serializedValue);
  } else if (value === undefined) {
    storage.set(key, 'undefined');
  } else {
    storage.set(key, value as any);
  }
}

/**
 * Checks if an item exists in local persistent storage.
 *
 * @param key The key of the item to check.
 * @returns Whether the item exists.
 */
export function hasLSItem(key: string): boolean {
  return storage.contains(key);
}

/**
 * Removes an item from local persistent storage.
 *
 * @param key The key of the item to remove.
 */
export function removeLSItem(key: string) {
  storage.delete(key);
}

/**
 * Appends an item to an array stored in local persistent storage.
 * If the item does not exist, it is created.
 *
 * @param key The key of the item to append.
 * @param value The value to append to the item.
 * @param discardDuplicates Whether to discard duplicate values in the array. Defaults to `false`.
 * @returns The updated array value when the item is appended.
 * @throws If the item cannot be appended due to an issue with underlying storage.
 */
export function pushLSArrItem<T = any>(key: string, value: T, discardDuplicates = false): T[] {
  const items: T[] = getLSItem(key, 'serialized') ?? [];
  if (!discardDuplicates || !items.includes(value)) {
    items.push(value);
    setLSItem(key, items);
  }
  return items;
}

/**
 * Removes an item from an array stored in local persistent storage.
 * If the item does not exist, nothing happens.
 *
 * @param key The key of the item to remove.
 * @param value The value to remove from the item.
 * @returns The updated array value when the item is removed.
 */
export function removeLSArrItem<T = any>(key: string, value: T): T[] {
  const items: T[] = getLSItem(key, 'serialized') ?? [];
  const index = items.indexOf(value);
  if (index !== -1) {
    items.splice(index, 1);
    setLSItem(key, items);
  }
  return items;
}

/**
 * Subscribes to item change events.
 *
 * @param key The key of the item to subscribe to.
 * @param callback The callback to invoke when the item changes.
 * @param getCurrentValue Whether to invoke the callback with the current value of the item.
 * @param dataType The {@link LSDataType} of the item. Defaults to `'serialized'`.
 * @returns A function to unsubscribe the callback.
 */
export function onLSItemChange<T>(
  key: string,
  callback: (newValue: T) => void,
  getCurrentValue = true,
  dataType: LSDataType = 'serialized'
): () => void {
  if (!changeListeners.has(key)) {
    changeListeners.set(key, new Set());
  }
  const listener = () => callback(getLSItem(key, dataType));
  changeListeners.get(key).add(listener);

  if (getCurrentValue) {
    callback(getLSItem(key, dataType));
  }

  return () => { // unsubscribe callback.
    changeListeners.get(key).delete(listener);
  };
}
