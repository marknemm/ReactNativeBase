/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `StatusDot` component.
 *
 * @param {object} props The component props.
 * @param {string} [props.color='gray'] The color of the dot. Defaults to `'gray'`.
 * @param {number} [props.size=10] The size of the dot. Defaults to `10`.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the dot.
 * @returns The styles for the `StatusDot` component.
 */
export function useStyles({ color = 'gray', size = 10, style }) {
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
