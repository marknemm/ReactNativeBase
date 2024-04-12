import { makeStyles } from '@rneui/themed';

/**
 * The `ForgotPasswordScreen` `useStyles` hook.
 */
export const useStyles = makeStyles((theme) => ({
  formError: {
    marginTop: 10,
    textAlign: 'center',
  },
  submitSuccessText: {
    color: theme.colors.success,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
}));
