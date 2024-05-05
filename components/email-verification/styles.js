/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';
import { User } from '@util/user';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `EmailVerification` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.containerStyle] The style to apply to the container.
 * @param {User} [props.user] The {@link User} to display the email verification status for.
 * @returns The styles for the `EmailVerification` component.
 */
export function useStyles({ containerStyle, user }) {
  return useThemedStyles((theme) => ({
    container: {
      marginHorizontal: theme.spacing.sm,
      ...StyleSheet.flatten(containerStyle),
    },
    icon: {
      color: user?.emailVerified
        ? theme.colors.success
        : theme.colors.error,
      marginRight: theme.spacing.xs,
    },
    resendButton: {
      textAlign: 'left',
    },
    statusContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    submitSuccessful: {
      color: theme.colors.success,
      fontWeight: 'bold',
    },
  }), [containerStyle, user?.emailVerified]);
}
