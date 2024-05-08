import { CameraDevice, CameraPosition, CameraProps } from 'react-native-vision-camera';

/**
 * The `Camera` component properties.
 */
export interface Props extends Omit<CameraProps, 'device'> {

  /**
   * The {@link CameraDevice} to use.
   */
  device?: CameraDevice;

  /**
   * The {@link CameraPosition position} of the {@link CameraDevice} relative to the phone.
   */
  position?: CameraPosition;

}

/**
 * The `Camera` component style properties.
 */
export type StyleProps = Pick<Props, 'style'>;
