import { InputProps as RneInputProps } from '@rneui/base';
import { FormFieldProps, FieldValues } from './form';

/**
 * Properties for `Input` components.
 */
export interface InputProps extends RneInputProps, FormFieldProps {

  /**
   * The minimum length of the password.
   *
   * If {@link rules} is given, this will be ignored.
   */
  minLength?: number;

  /**
   * The required validation state of the input.
   * If given a non-empty `string`, the input will be required and the string will be used as the error message.
   *
   * If {@link rules} is given, this will be ignored.
   *
   * @default `${label} is required`
   */
  required?: boolean | string;

}

/**
 * Properties for `EmailInput` components.
 */
export interface EmailInputProps extends InputProps {

  keyboardType?: 'email-address';

  /**
   * @default 'emailAddress'
   */
  textContentType?: 'emailAddress' | 'username';

}

/**
 * Properties for `PasswordInput` components.
 */
export interface PasswordInputProps extends InputProps {

  /**
   * @default 'current-password'
   */
  autoComplete?: 'current-password' | 'new-password';

  /**
   * Whether to enable the password visibility toggle.
   *
   * @default true
   */
  enablePasswordVisibilityToggle?: boolean;

  /**
   * @default 'default'
   */
  keyboardType?: 'default' | 'visible-password';

  /**
   * The minimum length of the password.
   *
   * If {@link rules} is given, this will be ignored.
   *
   * @default 6
   */
  minLength?: number;

  /**
   * @default 'password'
   */
  textContentType?: 'newPassword' | 'password';

}

/**
 * Properties for `PhoneInput` components.
 */
export interface PhoneInputProps extends InputProps {

  autoComplete?: 'tel';

  keyboardType?: 'phone-pad';

  textContentType?: 'telephoneNumber';

}
