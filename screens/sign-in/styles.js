/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';

/**
 * Gets the styles for the `SignInScreen` component.
 *
 * @returns The styles for the `SignInScreen` component.
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
      marginTop: -theme.spacing.lg,
    },
  }), []);
}
