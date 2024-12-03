import type { ModalProps } from '@components/modal/Modal.interfaces';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { StyleProp, TextStyle } from 'react-native';
import type SignInModal from './SignInModal';

/**
 * The {@link SignInModal} component properties.
 *
 * @extends ModalProps The {@link ModalProps} from the `@components/modal/Modal.interfaces` module.
 */
export interface SignInModalProps extends ModalProps<FirebaseAuthTypes.User> {

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
   * The sign-in prompt {@link TextStyle}.
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

/**
 * The {@link SignInModal} component style properties.
 */
export type SignInModalStyleProps = Pick<SignInModalProps, 'backdropStyle' | 'promptStyle' | 'style'>;
