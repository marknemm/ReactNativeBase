import { useThemedStyles } from '@hooks/styles-hooks';

/**
 * Gets the styles for the `UserProfileScreen` component.
 *
 * @returns The styles for the `UserProfileScreen` component.
 */
export function useStyles() {
  return useThemedStyles((theme) => ({
    avatar: {
      alignSelf: 'center',
      marginBottom: theme.spacing.xl,
    },
    emailVerification: {
      marginBottom: theme.spacing.xl,
    },
    checkIcon: {
      color: theme.colors.success,
    },
  }), []);
}
