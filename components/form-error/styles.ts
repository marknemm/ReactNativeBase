/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `FormError` component.
 *
 * @param props The component style props.
 * @returns The styles for the `FormError` component.
 */
export function useStyles({ center, style }: StyleProps) {
  return useThemedStyles((theme) => ({
    formError: {
      color: theme.colors.error,
      paddingHorizontal: theme.spacing.sm,
      textAlign: center ? 'center' : 'left',
      ...StyleSheet.flatten(style),
    },
  }), [center, style]);
}
