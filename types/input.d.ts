import { InputProps as RneInputProps } from '@rneui/base';
import { FormFieldProps } from './form-field';

/**
 * Properties for input components.
 *
 * @param F The type of the form data.
 */
export interface InputProps<F = any> extends RneInputProps, FormFieldProps<F> {}
