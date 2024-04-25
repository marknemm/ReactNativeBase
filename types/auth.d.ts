import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '@util/user';
import { ModalProps } from './modal';
import { TextStyle } from 'react-native';

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
 * The `PasswordModal` component properties.
 */
interface PasswordModalProps extends ModalProps {

  /**
   * The email address to sign in.
   */
  email: string;

  /**
   * The password prompt message.
   * Defaults to `'Sign in to your current account'`.
   *
   * @default 'Sign in to your current account'
   */
  prompt?: string;

  /**
   * The password prompt style.
   */
  promptStyle?: StyleProp<TextStyle>;

  /**
   * The submit button title.
   * Defaults to `'Sign In'`.
   *
   * @default 'Sign In'
   */
  submitTitle?: string;

}

/**
 * The `SignInModal` component properties.
 */
interface SignInModalProps extends ModalProps {

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

}
