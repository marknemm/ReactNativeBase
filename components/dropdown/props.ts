import { FormFieldProps } from '@interfaces/form';
import { FieldValues, ValidationRule } from 'react-hook-form';
import { StyleProp, TextStyle } from 'react-native';
import { DropdownProps as RneDropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

/**
 * The `Dropdown` component properties.
 *
 * @param T The type of the value.
 * @extends RneDropdownProps The {@link RneDropdownProps DropdownProps} from the `react-native-element-dropdown` package.
 * @extends FormFieldProps The {@link FormFieldProps} from the `@interfaces/form` package.
 */
export interface Props<
  T extends FieldValues = FieldValues
> extends Omit<RneDropdownProps<T>, 'data' | 'labelField' | 'onChange' | 'valueField'>, FormFieldProps {

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
 * The `Dropdown` component style properties.
 */
export type StyleProps = Pick<
  Props,
  'containerStyle' | 'itemContainerStyle' | 'itemTextStyle' |
  'labelStyle' | 'placeholderStyle' | 'selectedTextStyle' | 'style'
>;

/**
 * The raw dropdown data.
 */
export type RawDropdownData<T extends FieldValues = FieldValues>
  = Array<string | number | boolean | { label: string, value: any } | T>;
