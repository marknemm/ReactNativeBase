import { User } from '@util/user';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * The {@link EmailVerification} component properties.
 */
export interface Props {

  /**
   * The container style.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The {@link User} object.
   */
  user: User;

  /**
   * Determines if visible when verified.
   */
  isVerifiedVisible?: boolean;

}

/**
 * The `EmailVerification` component style properties.
 */
export type StyleProps = Pick<Props, 'containerStyle' | 'user'>;
