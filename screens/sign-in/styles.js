import { makeStyles } from '@rneui/themed';
import { horizontalGutter, verticalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `SignInScreen`.
 */
export const useStyles = makeStyles(() => ({
  oauthProviderButton: {
    height: 40,
    marginBottom: verticalGutter / 2,
    paddingVertical: verticalGutter,
    width: 312,
  },
  googleProviderButton: {
    height: 50,
    marginBottom: verticalGutter / 4,
    width: 320,
  },
  oauthProvidersView: {
    alignItems: 'center',
    marginBottom: verticalGutter * 1.5,
    marginHorizontal: horizontalGutter,
    marginTop: -verticalGutter,
  },
}));
