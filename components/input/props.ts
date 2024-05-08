import { FormFieldProps, ValidateFn, ValidationRules } from '@interfaces/form';
import { InputProps } from '@rneui/themed';
import { FieldPath, FieldValues, Message, Path, ValidationRule } from 'react-hook-form';
import { Mask } from 'react-native-mask-input';

/**
 * The `Input` component properties.
 *
 * @param TFieldValues The type of the form data.
 * @param TContext The type of the form context.
 * @param TFieldName The form field name.
 * @extends InputProps The {@link InputProps} from the `@rneui/themed` package.
 * @extends FormFieldProps The {@link FormFieldProps} from the `@interfaces/form` package.
 * @extends ValidationRules The {@link ValidationRules} from the `@interfaces/form` package.
 */
export interface Props<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends Omit<InputProps, 'maxLength'>,
  FormFieldProps<TFieldValues, TContext, TFieldName>,
  ValidationRules<TFieldValues, TFieldName>
{

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
 * The `Input` component style properties.
 */
export type StyleProps = Pick<InputProps, 'containerStyle' | 'inputContainerStyle' | 'inputStyle' | 'labelStyle' | 'style'>;
