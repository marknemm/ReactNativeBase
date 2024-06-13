import type { FormFieldProps } from '@interfaces/form';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues, Path, ValidationRule } from 'react-hook-form';
import type { StyleProp, TextStyle } from 'react-native';
import type { DropdownProps as RneDropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import type Dropdown from './Dropdown';

/**
 * The {@link Dropdown} component properties.
 *
 * @param T The type of the value.
 * @extends RneDropdownProps The {@link RneDropdownProps DropdownProps} from the `react-native-element-dropdown` package.
 * @extends FormFieldProps The {@link FormFieldProps} from the `@interfaces/form` package.
 */
export interface DropdownProps<
  T extends FieldValues = FieldValues,
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
> extends Omit<RneDropdownProps<T>, 'data' | 'labelField' | 'onChange' | 'valueField'>,
  FormFieldProps<TFieldValues, TContext, TFieldName> {

  /**
   * The data for the dropdown.
   */
  data?: RawDropdownData<T>;

  /**
   * Whether to include an empty option.
   */
  includeEmptyOption?: boolean;

  /**
   * The label of the dropdown.
   */
  label?: string | React.ReactNode;

  /**
   * The label field within each dropdown data item. Defaults to `'label'`.
   */
  labelField?: keyof T;

  /**
   * The style of the label.
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * On Change callback that is invoked whenever the dropdown value changes.
   *
   * @param value The new value.
   */
  onChange?: (value: T) => void;

  /**
   * The required validation rule of the `Input`.
   * If given a non-empty `string`, the `Input` will be required and the string will be used as the error message.
   *
   * @default `${label} is required`
   */
  required?: ValidationRule<boolean>;

  /**
   * The value field within each dropdown data item. Defaults to `'value'`.
   */
  valueField?: keyof T;

}

/**
 * The {@link Dropdown} component style properties.
 */
export type DropdownStyleProps = Pick<
  DropdownProps,
  'containerStyle' | 'itemContainerStyle' | 'itemTextStyle' |
  'labelStyle' | 'placeholderStyle' | 'selectedTextStyle' | 'style'
>;

/**
 * The raw dropdown data.
 */
export type RawDropdownData<T extends FieldValues = FieldValues>
  = Array<string | number | boolean | { label: string, value: any } | T>;

/**
 * The {@link Dropdown} component functional component type.
 *
 * @template T The type of the value.
 * @template TFieldValues The type of the form data.
 * @template TContext The type of the form context.
 * @template TFieldName The form field name.
 */
export type DropdownFC = <
  T extends FieldValues = FieldValues,
  TFieldValues extends FieldValues = any,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = Path<TFieldValues>
>(
  props: DropdownProps<T, TFieldValues, TContext, TFieldName>,
) => ReactNode;
