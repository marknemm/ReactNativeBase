import { useThemedStyles } from '@hooks/styles-hooks';
import type SignInScreen from './SignInScreen';

/**
 * Gets the styles for the {@link SignInScreen} component.
 *
 * @returns The styles for the {@link SignInScreen} component.
 */
export function useStyles() {
  return useThemedStyles((theme) => ({
    oauthProviderButton: {
      height: 40,
      marginBottom: theme.spacing.sm,
      paddingVertical: theme.spacing.lg,
      width: 312,
    },
    googleProviderButton: {
      height: 50,
      marginBottom: theme.spacing.xs,
      width: 320,
    },
    oauthProvidersView: {
      alignItems: 'center',
      marginBottom: theme.spacing.lg * 1.5,
      marginHorizontal: theme.spacing.sm,
    },
  }), []);
}
