import type { InputProps } from '@components/input/Input.interfaces';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues, Path, ValidationRule } from 'react-hook-form';
import type PhoneInput from './PhoneInput';

/**
 * The {@link PhoneInput} component properties.
 *
 * @extends InputProps The {@link InputProps} from the `@components/input/Input.interfaces` module.
 */
export interface PhoneInputProps<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends InputProps<TFieldValues, TContext, TFieldName>  {

  /**
   * @inheritdoc
   */
  autoComplete?: 'tel';

  /**
   * @inheritdoc
   */
  keyboardType?: 'phone-pad';

  /**
   * The pattern to match the phone number against.
   *
   * @default Constants.PHONE_PATTERN
   */
  pattern?: ValidationRule<RegExp>;

  /**
   * @inheritdoc
   */
  textContentType?: 'telephoneNumber';

}

/**
 * The {@link PhoneInput} component functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 * @param props The component {@link PhoneInputProps}.
 */
export type PhoneInputFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: PhoneInputProps<TFieldValues, TContext, TFieldName>
) => ReactNode;
