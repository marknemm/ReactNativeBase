import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type ErrorText from './ErrorText';
import type { ErrorTextStyleProps } from './ErrorText.interfaces';

/**
 * Gets the styles for the {@link ErrorText} component.
 *
 * @param props The component {@link ErrorTextStyleProps}.
 * @returns The styles for the {@link ErrorText} component.
 */
export function useStyles({ style }: ErrorTextStyleProps) {
  return useThemedStyles((theme) => ({
    style: {
      color: theme.colors.error,
      paddingHorizontal: theme.spacing.sm,
      ...StyleSheet.flatten(style),
    },
  }), [style]);
}
