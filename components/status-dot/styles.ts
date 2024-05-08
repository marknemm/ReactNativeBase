/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { Props } from './props';

/**
 * Gets the styles for the `StatusDot` component.
 *
 * @param props The component style props.
 * @returns The styles for the `StatusDot` component.
 */
export function useStyles({ color = 'gray', size = 10, style }: Props) {
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
