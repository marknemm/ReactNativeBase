import { StyleProp, ViewStyle } from 'react-native';

/**
 * The `Backdrop` component properties.
 */
export interface Props {

  /**
   * Whether the `Backdrop` is visible.
   * Defaults to `true`.
   *
   * @default true
   */
  isVisible?: boolean;

  /**
   * Callback invoked when the `Backdrop` is pressed.
   */
  onPress?: () => void;

  /**
   * The {@link ViewStyle} to apply to the `Backdrop`.
   */
  style?: StyleProp<ViewStyle>;

}

/**
 * The `Backdrop` component style properties.
 */
export type StyleProps = Pick<Props, 'style'>;
