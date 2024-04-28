import { makeStyles } from '@rneui/themed';
import { horizontalGutter } from '@styles/general-styles';
import { User } from '@util/user';

/**
 * Gets the styles for the `EmailVerification` component.
 *
 * @param {object} props The component properties.
 * @param {import('react-native').ViewStyle} [props.containerStyle] The container style.
 * @param {User} props.user The {@link User} object.
 * @param {boolean} [props.visibleVerified=false] Determines if the verified status is visible.
 * @returns {object} The styles.
 */
export const useStyles = makeStyles((theme, props) => ({
  container: {
    marginHorizontal: horizontalGutter,
    ...props.containerStyle,
  },
  icon: {
    color: props.user?.emailVerified
      ? theme.colors.success
      : theme.colors.error,
    marginRight: horizontalGutter / 2,
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
}));
