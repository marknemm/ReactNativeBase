import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type StatusDot from './StatusDot';
import type { StatusDotStyleProps } from './StatusDot.interfaces';

/**
 * Gets the styles for the {@link StatusDot} component.
 *
 * @param props The component {@link StatusDotStyleProps}.
 * @returns The styles for the {@link StatusDot} component.
 */
export function useStyles({ color = 'gray', size = 10, style }: StatusDotStyleProps) {
  return useThemedStyles(() => ({
    statusDot: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      ...StyleSheet.flatten(style),
    },
  }), [color, size, style]);
}
