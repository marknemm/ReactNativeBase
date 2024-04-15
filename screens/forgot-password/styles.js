import { makeStyles } from '@rneui/themed';

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
  submitSuccessText: {
    color: theme.colors.success,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
}));
