import AsyncStorage from '@react-native-async-storage/async-storage';
import { logErr } from './log';

/**
 * Gets an item from local persistent storage.
 *
 * @param {string} key The key of the item to get.
 * @returns {Promise<any>} A promise that resolves to the item value or `null` if the item does not exist.
 * @throws {Error} If the item cannot be retrieved due to an issue with underlying storage.
 */
export async function getItem(key) {
  try {
    const rawValue = await AsyncStorage.getItem(key);
    try {
      return rawValue !== null ? JSON.parse(rawValue) : null;
    } catch {
      return rawValue;
    }
  } catch (err) {
    logErr(err);
    throw err;
  }
}

/**
 * Sets an item in local persistent storage.
 *
 * @param {string} key The key of the item to store.
 * @param {any} value The value of the item to store.
 * @returns {Promise<void>} A promise that resolves when the item is stored.
 * @throws {Error} If the item cannot be stored due to an issue with underlying storage.
 */
export async function setItem(key, value) {
  try {
    const rawValue = typeof value !== 'string' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, rawValue);
  } catch (err) {
    logErr(err);
    throw err;
  }
}

/**
 * Removes an item from local persistent storage.
 *
 * @param {string} key The key of the item to remove.
 * @returns {Promise<void>} A promise that resolves when the item is removed.
 * @throws {Error} If the item cannot be removed due to an issue with underlying storage.
 */
export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    logErr(err);
    throw err;
  }
}

/**
 * Appends an item to an array stored in local persistent storage.
 * If the item does not exist, it is created.
 *
 * @param {string} key The key of the item to append.
 * @param {any} value The value to append to the item.
 * @param {boolean} [discardDuplicates=false] Whether to discard duplicate values in the array. Defaults to `false`.
 * @returns {Promise<Array<any>>} A promise that resolves to the updated array value when the item is appended.
 * @throws {Error} If the item cannot be appended due to an issue with underlying storage.
 */
export async function pushArrItem(key, value, discardDuplicates = false) {
  const items = (await getItem(key)) ?? [];
  if (!discardDuplicates || !items.includes(value)) {
    items.push(value);
    await setItem(key, items);
  }
  return items;
}

/**
 * Removes an item from an array stored in local persistent storage.
 * If the item does not exist, nothing happens.
 *
 * @param {string} key The key of the item to remove.
 * @param {any} value The value to remove from the item.
 * @returns {Promise<Array<any>>} A promise that resolves to the updated array value when the item is removed.
 * @throws {Error} If the item cannot be removed due to an issue with underlying storage.
 */
export async function removeArrItem(key, value) {
  const items = (await getItem(key)) ?? [];
  const index = items.indexOf(value);
  if (index !== -1) {
    items.splice(index, 1);
    await setItem(key, items);
  }
  return items;
}
