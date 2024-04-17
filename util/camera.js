import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export { MediaTypeOptions } from 'expo-image-picker';

/**
 * Opens the OS native camera and returns the captured image media.
 *
 * @param {ImagePicker.ImagePickerOptions} [options] The camera {@link ImagePicker.ImagePickerOptions options}.
 * @returns {Promise<ImagePicker.ImagePickerAsset[]>} A promise that resolves to the captured {@link ImagePicker.ImagePickerAsset image media}.
 * @throws {Error} If the user denies the permission to access the camera roll.
 */
export async function launchCamera(options = {}) {
  await requestCameraRollPermission('camera');

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    ...options,
  });

  return result.canceled
    ? []
    : result.assets;
}

/**
 * Opens the OS native image media library and returns the selected image media.
 *
 * @param {ImagePicker.ImagePickerOptions} [options] The image media picker {@link ImagePicker.ImagePickerOptions options}.
 * @returns {Promise<ImagePicker.ImagePickerAsset[]>} A promise that resolves to the selected {@link ImagePicker.ImagePickerAsset image media}.
 * @throws {Error} If the user denies the permission to access the camera roll.
 */
export async function launchMediaLibrary(options = {}) {
  await requestCameraRollPermission('camera');

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    allowsMultipleSelection: options?.selectionLimit > 1 || options?.selectionLimit === 0,
    aspect: [4, 3],
    quality: 1,
    ...options,
  });

  return result.canceled
    ? []
    : result.assets;
}

/**
 * Requests the user's permission to access the camera roll.
 * Does nothing if the user has already granted permission.
 * If the user denies the permission, an alert dialog is shown and an error is thrown.
 *
 * @param {'camera' | 'media'} target The permission target, either `camera` or `media`.
 * @returns {Promise<void>} A promise that resolves when the user grants permission.
 * @throws {Error} If the user denies the permission to access the camera roll.
 */
async function requestCameraRollPermission(target) {
  let permissions = (target === 'camera')
    ? await ImagePicker.getCameraPermissionsAsync()
    : await ImagePicker.getMediaLibraryPermissionsAsync();

  if (!permissions.granted && permissions.canAskAgain) {
    permissions = (target === 'camera')
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
  }

  if (!permissions.granted) {
    Alert.alert('Permission Required', 'Please enable camera access in your device settings');
    throw new Error('Permission to access camera roll is required');
  }
}
