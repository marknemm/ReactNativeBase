import { MMKV } from 'react-native-mmkv';

const changeListeners = new Map();
const storage = new MMKV();

// Setup listener to invoke callbacks when specific items change.
storage.addOnValueChangedListener((key) =>
  changeListeners.get(key)?.forEach((callback) => callback())
);

/**
 * Gets an item from local persistent storage.
 *
 * @param {string} key The key of the item to get.
 * @param {Types.LocalStorage.LSDataType} [dataType] The {@link Types.LocalStorage.LSDataType data type} of the item. Defaults to `'serialized'`.
 * @returns {any} The item value or `null` if the item does not exist.
 */
export function getLSItem(key, dataType = 'serialized') {
  switch (dataType) {
    case 'boolean': return storage.getBoolean(key);
    case 'buffer':  return storage.getBuffer(key);
    case 'number':  return storage.getNumber(key);
    case 'string':  return storage.getString(key);
    default: {
      const serializedValue = storage.getString(key);
      try { // Safely attempt to deserialize JSON string. Return raw serialized value if error.
        return serializedValue !== null ? JSON.parse(serializedValue) : null;
      } catch {
        return serializedValue === 'undefined' ? undefined : serializedValue;
      }
    }
  }
}

/**
 * Sets an item in local persistent storage.
 *
 * @param {string} key The key of the item to store.
 * @param {any} value The value of the item to store.
 */
export function setLSItem(key, value) {
  if (typeof value === 'object') {
    const serializedValue = JSON.stringify(value);
    storage.set(key, serializedValue);
  } else if (value === undefined) {
    storage.set(key, 'undefined');
  } else {
    storage.set(key, value);
  }
}

/**
 * Checks if an item exists in local persistent storage.
 *
 * @param {string} key The key of the item to check.
 * @returns {boolean} Whether the item exists.
 */
export function hasLSItem(key) {
  return storage.contains(key);
}

/**
 * Removes an item from local persistent storage.
 *
 * @param {string} key The key of the item to remove.
 */
export function removeLSItem(key) {
  storage.delete(key);
}

/**
 * Appends an item to an array stored in local persistent storage.
 * If the item does not exist, it is created.
 *
 * @param {string} key The key of the item to append.
 * @param {any} value The value to append to the item.
 * @param {boolean} [discardDuplicates=false] Whether to discard duplicate values in the array. Defaults to `false`.
 * @returns {any[]} The updated array value when the item is appended.
 * @throws {Error} If the item cannot be appended due to an issue with underlying storage.
 */
export function pushLSArrItem(key, value, discardDuplicates = false) {
  const items = getLSItem(key, 'serialized') ?? [];
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
 * @param {string} key The key of the item to remove.
 * @param {any} value The value to remove from the item.
 * @returns {any[]} The updated array value when the item is removed.
 */
export function removeLSArrItem(key, value) {
  const items = getLSItem(key, 'serialized') ?? [];
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
 * @param {string} key The key of the item to subscribe to.
 * @param {(newValue: any) => void} callback The callback to invoke when the item changes.
 * @param {boolean} [getCurrentValue=true] Whether to invoke the callback with the current value of the item.
 * @param {Types.LocalStorage.LSDataType} [dataType] The {@link Types.LocalStorage.LSDataType data type} of the item. Defaults to `'serialized'`.
 * @returns {() => void} A function to unsubscribe the callback.
 */
export function onLSItemChange(key, callback, getCurrentValue = true, dataType = 'serialized') {
  if (!changeListeners.has(key)) {
    changeListeners.set(key, new Set());
  }
  changeListeners.get(key).add(() => callback(getLSItem(key, dataType)));

  if (getCurrentValue) {
    getLSItem(key, dataType).then(callback);
  }

  return () => { // unsubscribe callback.
    changeListeners.get(key).delete(callback);
  };
}
