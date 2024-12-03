import type { FormFieldProps, ValidateFn, ValidationRules } from '@interfaces/form';
import type { InputProps as RneInputProps } from '@rneui/themed';
import type { PropsWithChildren, ReactNode, Ref } from 'react';
import type { FieldPath, FieldValues, Message, Path, ValidationRule } from 'react-hook-form';
import type { TextInput } from 'react-native';
import type { Mask } from 'react-native-mask-input';
import type Input from './Input';

/**
 * The {@link Input} component properties.
 *
 * @param TFieldValues The type of the form data.
 * @param TContext The type of the form context.
 * @param TFieldName The form field name.
 * @extends InputProps The {@link InputProps} from the `@rneui/themed` package.
 * @extends FormFieldProps The {@link FormFieldProps} from the `@interfaces/form` package.
 * @extends ValidationRules The {@link ValidationRules} from the `@interfaces/form` package.
 */
export interface InputProps<
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends Omit<RneInputProps, 'maxLength'>,
  FormFieldProps<TFieldValues, TContext, TFieldName>,
  ValidationRules<TFieldValues, TFieldName>
{

  /**
   * The mask to apply to the {@link Input}.
   */
  mask?: Mask;

  /**
   * The maximum value of a valid {@link Input} value.
   */
  max?: ValidationRule<number | string>;

  /**
   * The maximum length of a valid {@link Input} value.
   */
  maxLength?: ValidationRule<number>;

  /**
   * Whether the {@link maxLength} validation rule should limit the number of characters typed by the user.
   *
   * @default false
   */
  maxLengthLimitTyping?: boolean;

  /**
   * The minimum value of a valid {@link Input} value.
   */
  min?: ValidationRule<number | string>;

  /**
   * The minimum length of a valid {@link Input} value.
   */
  minLength?: ValidationRule<number>;

  /**
   * The pattern to match the {@link Input} value against.
   */
  pattern?: ValidationRule<RegExp>;

  /**
   * The {@link Input} reference.
   */
  ref?: Ref<InputRefType>;

  /**
   * The required validation rule of the {@link Input}.
   * If given a non-empty `string`, the {@link Input} will be required and the string will be used as the error message.
   *
   * @default `${label} is required`
   */
  required?: Message | ValidationRule<boolean>;

  /**
   * The custom validation callback function to use for the {@link Input}.
   */
  validate?: ValidateFn<TFieldValues, TFieldName>;

}

/**
 * The {@link Input} component style properties.
 */
export type InputStyleProps = Pick<
  InputProps,
  'containerStyle' | 'disabledInputStyle' | 'errorStyle' | 'inputContainerStyle' | 'inputStyle'
  | 'labelStyle' | 'leftIconContainerStyle' | 'rightIconContainerStyle' | 'style'
>;

/**
 * The {@link Input} functional component type.
 *
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 */
export type InputFC = <
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: InputProps<TFieldValues, TContext, TFieldName>,
) => ReactNode;

/**
 * The {@link Input} component reference type.
 */
export type InputRefType = TextInput & PropsWithChildren<RneInputProps>;
