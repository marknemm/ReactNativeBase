import type { InputProps } from '@components/input/Input.interfaces';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues, Path, ValidationRule } from 'react-hook-form';
import type EmailInput from './EmailInput';

/**
 * The {@link EmailInput} component properties.
 *
 * @extends InputProps The {@link InputProps} from the `@components/input/Input.interfaces` module.
 */
export interface EmailInputProps<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends InputProps<TFieldValues, TContext, TFieldName> {

  /**
   * @inheritdoc
   */
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
 * The {@link EmailInput} component functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 */
export type EmailInputFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: EmailInputProps<TFieldValues, TContext, TFieldName>,
) => ReactNode;
