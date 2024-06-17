import type { InputProps } from '@components/input/Input.interfaces';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues, Path, ValidationRule } from 'react-hook-form';
import type PasswordInput from './PasswordInput';

/**
 * The {@link PasswordInput} component properties.
 *
 * @extends InputProps The {@link InputProps} from the `@components/input/Input.interfaces` module.
 */
export interface PasswordInputProps<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends InputProps<TFieldValues, TContext, TFieldName>  {

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
 * The {@link PasswordInput} component functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 */
export type PasswordInputFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: PasswordInputProps<TFieldValues, TContext, TFieldName>,
) => ReactNode;
