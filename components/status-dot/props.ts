import { ColorValue, StyleProp, ViewStyle } from 'react-native';

/**
 * The `StatusDot` component properties.
 */
export interface Props {

  /**
   * The color of the `StatusDot`.
   */
  color?: ColorValue;

  /**
   * The size or diameter of the `StatusDot`.
   */
  size?: number;

  /**
   * The additional {@link ViewStyle} of the `StatusDot`.
   */
  style?: StyleProp<ViewStyle>;

}
