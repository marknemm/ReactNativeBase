import type { StyleProp, ViewStyle } from 'react-native';
import type Backdrop from './Backdrop';

/**
 * The {@link Backdrop} component properties.
 */
export interface BackdropProps {

  /**
   * Whether the {@link Backdrop} is visible.
   * Defaults to `true`.
   *
   * @default true
   */
  isVisible?: boolean;

  /**
   * Callback invoked when the {@link Backdrop} is pressed.
   */
  onPress?: () => void;

  /**
   * The {@link ViewStyle} to apply to the {@link Backdrop}.
   */
  style?: StyleProp<ViewStyle>;

}

/**
 * The {@link Backdrop} component style properties.
 */
export type BackdropStyleProps = Pick<BackdropProps, 'style'>;
