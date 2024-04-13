import { makeStyles } from '@rneui/themed';
import { generalStyles, horizontalGutter } from '@styles/general-styles';

/**
 * The `LoginScreen` `useStyles` hook.
 */
export const useStyles = makeStyles((theme) => ({
  formError: {
    marginTop: 10,
    textAlign: 'center',
  },
  oauthProvidersView: {
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: horizontalGutter,
  },
  oauthProviderButton: {
    ...generalStyles.bottomGutter,
    ...generalStyles.fill,
  },
  skipLogin: {
    marginTop: 'auto',
  },
}));
