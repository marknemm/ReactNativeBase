import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '@util/user';

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
