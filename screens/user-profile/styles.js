import { makeStyles } from '@rneui/themed';
import { verticalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `UserProfileScreen`.
 */
export const useStyles = makeStyles((theme) => ({
  avatar: {
    alignSelf: 'center',
    marginBottom: verticalGutter + 20,
  },
  emailVerification: {
    marginBottom: verticalGutter,
  },
  checkIcon: {
    color: theme.colors.success,
  },
}));
