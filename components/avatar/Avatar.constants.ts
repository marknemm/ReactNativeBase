import { CameraType, MediaTypeOptions, type ImagePickerOptions } from 'expo-image-picker';

/**
 * The `Avatar` component's image picker and camera {@link ImagePickerOptions options}.
 */
export const IMAGE_PICKER_OPTIONS: ImagePickerOptions = {
  allowsEditing: true,
  aspect: [1, 1],
  cameraType: CameraType.front,
  mediaTypes: MediaTypeOptions.Images,
};
