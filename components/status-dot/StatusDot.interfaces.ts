import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
import type StatusDot from './StatusDot';

/**
 * The {@link StatusDot} component properties.
 */
export interface StatusDotProps {

  /**
   * The color of the {@link StatusDot}.
   */
  color?: ColorValue;

  /**
   * The size or diameter of the {@link StatusDot}.
   */
  size?: number;

  /**
   * The additional {@link ViewStyle} of the {@link StatusDot}.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * The test identifier of the {@link StatusDot}.
   */
  testID?: string;

}

/**
 * The {@link StatusDot} component style properties.
 */
export type StatusDotStyleProps = Pick<StatusDotProps, 'color' | 'size' | 'style'>;
