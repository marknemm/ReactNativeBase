import { InputProps as RneInputProps } from '@rneui/base';
import { Mask } from 'react-native-mask-input';
import { FieldValues, FormFieldProps, ValidateFn, ValidationRule, ValidationRules } from './form';

/**
 * Properties for `Input` components.
 *
 * @param TFieldValues The type of the form data.
 * @param TContext The type of the form context.
 * @param TFieldName The form field name.
 */
export interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = keyof TFieldValues
> extends RneInputProps, FormFieldProps<TFieldValues, TContext, TFieldName>, ValidationRules<TFieldValues, TFieldName> {

  /**
   * The mask to apply to the `Input`.
   */
  mask?: Mask;

  /**
   * The maximum value of a valid `Input` value.
   */
  max?: ValidationRule<number | string>;

  /**
   * The maximum length of a valid `Input` value.
   */
  maxLength?: ValidationRule<number>;

  /**
   * Whether the {@link maxLength} validation rule should limit the number of characters typed by the user.
   *
   * @default false
   */
  maxLengthLimitTyping?: boolean;

  /**
   * The minimum value of a valid `Input` value.
   */
  min?: ValidationRule<number | string>;

  /**
   * The minimum length of a valid `Input` value.
   */
  minLength?: ValidationRule<number>;

  /**
   * The pattern to match the `Input` value against.
   */
  pattern?: ValidationRule<RegExp>;

  /**
   * The required validation rule of the `Input`.
   * If given a non-empty `string`, the `Input` will be required and the string will be used as the error message.
   *
   * @default `${label} is required`
   */
  required?: Message | ValidationRule<boolean>;

  /**
   * The custom validation callback function to use for the `Input`.
   */
  validate?: ValidateFn<TFieldValues, TFieldName>;

}

/**
 * Properties for `EmailInput` components.
 */
export interface EmailInputProps extends InputProps {

  keyboardType?: 'email-address';

  /**
   * The pattern to match the email address against.
   *
   * @default Constants.EMAIL_PATTERN
   */
  pattern?: ValidationRule<RegExp>;

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
   * Whether the password visibility toggle is enabled.
   *
   * @default true
   */
  isVisibilityToggleEnabled?: boolean;

  /**
   * @default 'default'
   */
  keyboardType?: 'default' | 'visible-password';

  /**
   * The minimum length of the password.
   *
   * @default 6
   */
  minLength?: ValidationRule<number>;

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

  /**
   * The pattern to match the phone number against.
   *
   * @default Constants.PHONE_PATTERN
   */
  pattern?: ValidationRule<RegExp>;

  textContentType?: 'telephoneNumber';

}
