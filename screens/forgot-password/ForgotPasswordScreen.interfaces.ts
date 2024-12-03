import type { ScreenProps } from '@interfaces/screen';
import type ForgotPasswordScreen from './ForgotPasswordScreen';

/**
 * The {@link ForgotPasswordScreen} component properties.
 *
 * @extends ScreenProps The {@link ScreenProps} from the `@interfaces/screen` module.
 */
export interface ForgotPasswordScreenProps extends ScreenProps {

  /**
   * Whether the screen is a modal.
   */
  isModal?: boolean;

  /**
   * The function to call when the user presses the sign in button.
   */
  onSignIn?: () => void;

  /**
   * The email address that must be used for the forgot password.
   */
  readOnlyEmail?: string;

}
