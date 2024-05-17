import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `ErrorText` component.
 *
 * @param props The component {@link StyleProps}.
 * @returns The styles for the `ErrorText` component.
 */
export function useStyles({ style }: StyleProps) {
  return useThemedStyles((theme) => ({
    style: {
      color: theme.colors.error,
      paddingHorizontal: theme.spacing.sm,
      ...StyleSheet.flatten(style),
    },
  }), [style]);
}
