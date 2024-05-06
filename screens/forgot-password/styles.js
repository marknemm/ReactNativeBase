/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';

/**
 * Gets the styles for the `ForgotPassword` component.
 *
 * @returns The styles for the `ForgotPassword` component.
 */
export function useStyles() {
  return useThemedStyles((theme) => ({
    submitSuccessText: {
      color: theme.colors.success,
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: theme.spacing.lg,
      textAlign: 'center',
    },
  }), []);
}
