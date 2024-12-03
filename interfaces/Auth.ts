import type { SignInModalProps } from '@components/sign-in-modal/SignInModal.interfaces';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { ConfigureParams } from '@react-native-google-signin/google-signin';
import type User from '@util/user';

/**
 * The authentication options.
 *
 * @extends ConfigureParams GoogleSignin {@link ConfigureParams configuration params}.
 */
export interface AuthOptions extends ConfigureParams {

  /**
   * The component to use when prompting the user to sign in via modal dialog.
   */
  SignInModal: React.FunctionComponent<SignInModalProps>;

}

/**
 * The result of an authentication operation.
 */
export interface AuthResult {

  /**
   * The user's authentication credentials.
   */
  authCredential: FirebaseAuthTypes.AuthCredential;

  /**
   * The user's email address.
   */
  email: string;

}

/**
 * Authentication state for a {@link User}.
 */
export interface AuthState {
  /**
   * The authentication user data.
   */
  authUser: FirebaseAuthTypes.User;

  /**
   * The user loading status.
   */
  userLoading: boolean;

  /**
   * The {@link User} data.
   */
  user: User;

}
