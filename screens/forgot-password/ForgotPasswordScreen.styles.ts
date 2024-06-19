import { useThemedStyles } from '@hooks/styles-hooks';
import type ForgotPasswordScreen from './ForgotPasswordScreen';

/**
 * Gets the styles for the {@link ForgotPasswordScreen} component.
 *
 * @returns The styles for the {@link ForgotPasswordScreen} component.
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
