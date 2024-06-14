import type User from '@util/user';
import type { StyleProp, ViewStyle } from 'react-native';
import type EmailVerification from './EmailVerification';

/**
 * The {@link EmailVerification} component properties.
 */
export interface EmailVerificationProps {

  /**
   * The container style.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Determines if visible when verified. Defaults to `false`.
   */
  isVisibleWhenVerified?: boolean;

  /**
   * The {@link User} object.
   */
  user: User;

}

/**
 * The {@link EmailVerification} component style properties.
 */
export type EmailVerificationStyleProps = Pick<EmailVerificationProps, 'containerStyle' | 'user'>;
