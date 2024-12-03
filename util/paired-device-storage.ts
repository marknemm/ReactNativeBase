import { SETTINGS_DEVICES_PAIRED_IDS_KEY } from '@constants/storage-keys';
import { Device } from 'react-native-ble-plx';
import { getLSItem, pushLSArrItem, removeLSArrItem } from './local-storage';

/**
 * Gets the list of paired Bluetooth {@link Device} IDs from persistent local storage.
 *
 * @returns The list of paired Bluetooth {@link Device} IDs.
 */
export function getPairedDeviceIds(): string[] {
  return getLSItem(SETTINGS_DEVICES_PAIRED_IDS_KEY) ?? [];
}

/**
 * Checks if a Bluetooth {@link Device} is paired.
 *
 * @param deviceId The Bluetooth {@link Device} ID to check.
 * @returns `true` if the device is paired, otherwise `false`.
 */
export function isDevicePaired(deviceId: string): boolean {
  return getPairedDeviceIds().includes(deviceId);
}

/**
 * Adds a paired Bluetooth {@link Device} ID to a list in persistent local storage.
 * If the ID is already in the list, it is not added again.
 *
 * @param deviceId The paired Bluetooth {@link Device} ID to add.
 * @returns The updated list of paired Bluetooth {@link Device} IDs.
 */
export function pushPairedDevice(deviceId: string): string[] {
  return pushLSArrItem(SETTINGS_DEVICES_PAIRED_IDS_KEY, deviceId, true); // true to ensure unique values
}

/**
 * Removes a paired Bluetooth {@link Device} ID from a list in persistent local storage.
 *
 * @param deviceId The paired Bluetooth {@link Device} ID to remove.
 * @returns The updated list of paired Bluetooth {@link Device} IDs.
 */
export function removePairedDevice(deviceId: string): string[] {
  return removeLSArrItem(SETTINGS_DEVICES_PAIRED_IDS_KEY, deviceId);
}
