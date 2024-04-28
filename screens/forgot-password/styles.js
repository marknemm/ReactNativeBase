import { makeStyles } from '@rneui/themed';
import { verticalGutter } from '@styles/general-styles';

/**
 * The `ForgotPasswordScreen` `useStyles` hook.
 */
export const useStyles = makeStyles((theme) => ({
  submitSuccessText: {
    color: theme.colors.success,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: verticalGutter,
    textAlign: 'center',
  },
}));
