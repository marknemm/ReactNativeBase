/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `FormError` component.
 *
 * @param {object} props The component props.
 * @param {boolean} [props.center] Indicates if the error should be centered.
 * @param {Types.StyleProp<Types.TextStyle>} [props.style] The style to apply to the error.
 * @returns The styles for the `FormError` component.
 */
export function useStyles({ center, style }) {
  return useThemedStyles((theme) => ({
    formError: {
      color: theme.colors.error,
      paddingHorizontal: theme.spacing.sm,
      textAlign: center ? 'center' : 'left',
      ...StyleSheet.flatten(style),
    },
  }), [center, style]);
}