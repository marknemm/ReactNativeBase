import { Props as ModalProps } from '@components/modal/props';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StyleProp, TextStyle } from 'react-native';

/**
 * The `SignInModal` component properties.
 *
 * @extends ModalProps The {@link ModalProps} from the `@interfaces/modal` package.
 */
export interface Props extends ModalProps<FirebaseAuthTypes.User> {

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
 * The `SignInModal` component style properties.
 */
export type StyleProps = Pick<Props, 'backdropStyle' | 'promptStyle' | 'style'>;
