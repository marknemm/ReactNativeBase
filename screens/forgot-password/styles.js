import { makeStyles } from '@rneui/themed';
import { horizontalGutter } from '@styles/general-styles';

/**
 * The `ForgotPasswordScreen` `useStyles` hook.
 */
export const useStyles = makeStyles((theme) => ({
  formError: {
    marginTop: 10,
    textAlign: 'center',
  },
  formField: {
    marginBottom: 5,
  },
  submitButton: {
    marginBottom: 10,
    marginHorizontal: horizontalGutter,
  },
  submitSuccessText: {
    color: theme.colors.success,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
}));
