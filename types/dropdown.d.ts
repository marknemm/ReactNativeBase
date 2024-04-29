import { StyleProp } from 'react-native';
import { DropdownProps as RneDropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { TextStyle } from 'react-native-size-matters';
import { FormFieldProps, ValidationRule } from './form';

/**
 * Properties for dropdown components.
 *
 * @param T The type of the value.
 */
export interface DropdownProps<T = any> extends RneDropdownProps<T>, FormFieldProps {

  /**
   * The data for the dropdown.
   */
  data?: Array<string | number | boolean | { label: string, value: T } | Object>;

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
  labelField?: string;

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
  valueField?: string;

}
