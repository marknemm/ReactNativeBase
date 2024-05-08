/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `EmailVerification` component.
 *
 * @param props The component style props.
 * @returns The styles for the `EmailVerification` component.
 */
export function useStyles({ containerStyle, user }: StyleProps) {
  return useThemedStyles((theme) => ({
    container: {
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
