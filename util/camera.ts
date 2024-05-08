import { ImagePickerAsset, ImagePickerOptions, getCameraPermissionsAsync, getMediaLibraryPermissionsAsync, launchCameraAsync, launchImageLibraryAsync, requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { Alert } from 'react-native';

export { CameraType, ImagePickerAsset, ImagePickerOptions, MediaTypeOptions } from 'expo-image-picker';

/**
 * Opens the OS native camera and returns the captured image media.
 *
 * @param options The camera {@link ImagePickerOptions options}.
 * @returns A promise that resolves to the captured {@link ImagePickerAsset asset}.
 * @throws If the user denies the permission to access the camera roll.
 */
export async function launchCamera(options: ImagePickerOptions = {}) {
  await requestCameraRollPermission('camera');

  const result = await launchCameraAsync({
    allowsMultipleSelection: options?.selectionLimit > 1 || options?.selectionLimit === 0,
    ...options,
  });

  return result.canceled
    ? []
    : result.assets;
}

/**
 * Opens the OS native image media library and returns the selected image media.
 *
 * @param options The image media picker {@link ImagePicker.ImagePickerOptions options}.
 * @returns A promise that resolves to the selected {@link ImagePickerAsset asset}.
 * @throws If the user denies the permission to access the camera roll.
 */
export async function launchMediaLibrary(options: ImagePickerOptions = {}): Promise<ImagePickerAsset[]> {
  await requestCameraRollPermission('camera');

  const result = await launchImageLibraryAsync({
    allowsMultipleSelection: options?.selectionLimit > 1 || options?.selectionLimit === 0,
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
 * @param target The permission target, either `camera` or `media`.
 * @returns A promise that resolves when the user grants permission.
 * @throws If the user denies the permission to access the camera roll.
 */
async function requestCameraRollPermission(target: 'camera' | 'media'): Promise<void> {
  let permissions = (target === 'camera')
    ? await getCameraPermissionsAsync()
    : await getMediaLibraryPermissionsAsync();

  if (!permissions.granted && permissions.canAskAgain) {
    permissions = (target === 'camera')
      ? await requestCameraPermissionsAsync()
      : await requestMediaLibraryPermissionsAsync();
  }

  if (!permissions.granted) {
    Alert.alert('Permission Required', 'Please enable camera access in your device settings');
    throw new Error('Permission to access camera roll is required');
  }
}
