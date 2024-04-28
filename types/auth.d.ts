import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '@util/user';
import { ModalProps } from './modal';
import { TextStyle } from 'react-native';
import { ConfigureParams } from '@react-native-google-signin/google-signin';

/**
 * The authentication options.
 *
 * @extends ConfigureParams GoogleSignin configuration options.
 */
interface AuthOptions extends ConfigureParams {

  /**
   * The component to use when prompting the user to sign in via modal dialog.
   */
  SignInModal: React.FunctionComponent<SignInModalProps>;

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

/**
 * The `SignInModal` component properties.
 */
interface SignInModalProps extends ModalProps<FirebaseAuthTypes.User> {

  /**
   * Whether to show the (email) password only sign-in form.
   * Defaults to `false`.
   *
   * @default false
   */
  isPasswordOnly?: boolean;

  /**
   * The sign-in prompt message.
   * Defaults to `''`
   *
   * @default ''
   */
  prompt?: string;

  /**
   * The sign-in prompt style.
   */
  promptStyle?: StyleProp<TextStyle>;

  /**
   * The sign-in email that must be used for sign-in.
   * Defaults to `''`.
   *
   * @default ''
   */
  readOnlyEmail?: string;

}
