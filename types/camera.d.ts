import { CameraProps as VisionCameraProps } from 'react-native-vision-camera';

export interface CameraProps extends VisionCameraProps {

  device?: CameraDevice;

  /**
   * The position of the camera device relative to the phone.
   */
  position?: CameraPosition;

}
