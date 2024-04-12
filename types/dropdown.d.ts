import { DropdownProps as RneDropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { FormFieldProps } from './form-field';

/**
 * Properties for dropdown components.
 *
 * @param T The type of the value.
 * @param F The type of the form data.
 */
export interface DropdownProps<T = any, F = Any> extends RneDropdownProps<T>, FormFieldProps<F> {

  /**
   * The data for the dropdown.
   */
  data?: Array<string | number | boolean | { label: string, value: T } | Object>;

  /**
   * Whether to include an empty option.
   */
  includeEmptyOption?: boolean;

  /**
   * The label field within each dropdown data item. Defaults to `'label'`.
   */
  labelField?: string;

  /**
   * On Change callback that is invoked whenever the dropdown value changes.
   *
   * @param value The new value.
   */
  onChange?: (value: T) => void;

  /**
   * The value field within each dropdown data item. Defaults to `'value'`.
   */
  valueField?: string;
}
