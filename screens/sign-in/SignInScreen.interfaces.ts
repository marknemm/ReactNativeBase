import type { ScreenProps } from '@interfaces/screen';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type SignInScreen from './SignInScreen';

/**
 * The {@link SignInScreen} component properties.
 */
export interface SignInScreenProps extends ScreenProps {

  /**
   * Whether the screen is a modal.
   */
  isModal?: boolean;

  /**
   * Whether to show only the (email) password sign-in.
   */
  isPasswordOnly?: boolean;

  /**
   * The function to call when the user clicks the forgot password button.
   */
  onForgotPassword?: () => void;

  /**
   * The function to call after signing in.
   *
   * @param authUser The authenticated {@link FirebaseAuthTypes.User}.
   */
  onSignIn?: (authUser: FirebaseAuthTypes.User) => void;

  /**
   * The email address that must be used for sign in.
   */
  readOnlyEmail?: string;

}
