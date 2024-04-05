import { SETTINGS_DEVICES_PAIRED_IDS_KEY } from '@constants/storage-keys';
import { Device } from 'react-native-ble-plx';
import { logErr } from './log';
import { getItem, pushArrItem, removeArrItem } from './storage';

/**
 * Gets the list of paired Bluetooth {@link Device} IDs from persistent local storage.
 *
 * @returns {Promise<string[]>} A promise that resolves to the list of paired Bluetooth {@link Device} IDs.
 */
export async function getPairedDeviceIds() {
  try {
    return (await getItem(SETTINGS_DEVICES_PAIRED_IDS_KEY)) ?? [];
  } catch (err) {
    logErr('Failed to get paired device IDs from persistent storage');
  }
  return [];
}

/**
 * Checks if a Bluetooth {@link Device} is paired.
 *
 * @param {string} deviceId The Bluetooth {@link Device} ID to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the device is paired, otherwise `false`.
 */
export async function isDevicePaired(deviceId) {
  try {
    const pairedDeviceIds = await getPairedDeviceIds();
    return pairedDeviceIds?.includes(deviceId);
  } catch (err) {
    logErr('Failed to check if device is paired');
  }
  return false;
}

/**
 * Adds a paired Bluetooth {@link Device} ID to a list in persistent local storage.
 * If the ID is already in the list, it is not added again.
 *
 * @param {string} deviceId The paired Bluetooth {@link Device} ID to add.
 * @returns {Promise<string[]>} A promise that resolves to the updated list of paired Bluetooth {@link Device} IDs.
 */
export async function pushPairedDeviceId(deviceId) {
  try {
    return pushArrItem(SETTINGS_DEVICES_PAIRED_IDS_KEY, deviceId, true); // true to ensure unique values
  } catch (err) {
    logErr('Failed to add paired device ID to persistent storage');
  }
  return [];
}

/**
 * Removes a paired Bluetooth {@link Device} ID from a list in persistent local storage.
 *
 * @param {string} deviceId The paired Bluetooth {@link Device} ID to remove.
 * @returns {Promise<string[]>} A promise that resolves to the updated list of paired Bluetooth {@link Device} IDs.
 */
export async function removePairedDeviceId(deviceId) {
  try {
    return removeArrItem(SETTINGS_DEVICES_PAIRED_IDS_KEY, deviceId);
  } catch (err) {
    logErr('Failed to remove paired device ID from persistent storage');
  }
  return [];
}
