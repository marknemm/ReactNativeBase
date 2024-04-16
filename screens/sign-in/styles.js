import { makeStyles } from '@rneui/themed';
import { horizontalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `SignInScreen`.
 */
export const useStyles = makeStyles((theme) => ({
  formError: {
    marginTop: 10,
    textAlign: 'center',
  },
  formField: {
    marginBottom: 5,
  },
  oauthProviderButton: {
    height: 40,
    marginBottom: 10,
    paddingVertical: 20,
    width: 312,
  },
  googleProviderButton: {
    height: 50,
    marginBottom: 5,
    width: 320,
  },
  oauthProvidersView: {
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: horizontalGutter,
    marginTop: -20,
  },
  skipSignInButton: {
    borderTopWidth: 0.25,
    borderTopColor: theme.colors.primary,
    marginHorizontal: horizontalGutter,
    marginTop: 'auto',
  },
  skipSignInText: {
    fontSize: 16,
    fontWeight: '300',
  },
  submitButton: {
    marginBottom: 10,
    marginHorizontal: horizontalGutter,
  },
}));
