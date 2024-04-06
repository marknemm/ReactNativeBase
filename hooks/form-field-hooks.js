import { FormContext } from '@contexts/form/FormContext';
import { useContext } from 'react';

/**
 * Custom hook to derive the form control.
 *
 * @param {Object} props The component properties.
 * @param {import('react-hook-form').Control} [props.control] The form control.
 * @param {string} [props.name=''] The name of the form control.
 * @returns {import('react-hook-form').Control} The form control.
 * @throws {Error} The name property is required when using form controls.
 */
export function useFormControl({ control, name = '' }) {
  const form = useContext(FormContext);

  if (!control && form) {
    control = form.control;
  }

  if (control && !name) {
    throw new Error('The name property is required when using form controls.');
  }

  return control;
}

/**
 * Custom hook to derive form error messages.
 *
 * @param {import('@typedefs/form-field').FormFieldProps} props The component properties.
 * @returns {string} The error message.
 */
export function useFormErrorMessage({ errorMessage = '', rulesErrorMessageMap, errors, name = '', rules }) {
  const form = useContext(FormContext);
  const error = errors ? errors[name] : form?.formState.errors[name];

  if (!errorMessage && error) {
    errorMessage = error.message?.toString();

    if (!errorMessage && rulesErrorMessageMap) {
      errorMessage = rulesErrorMessageMap[error.type.toString()];
    }

    if (!errorMessage) {
      switch (error.type) {
        case 'required':
          errorMessage = 'This field is required';
          break;
        case 'min':
          errorMessage = rules?.min != null
            ? `The value must be at least ${rules.min}`
            : 'The value is too small';
          break;
        case 'max':
          errorMessage = rules?.max != null
            ? `The value must be at most ${rules.max}`
            : 'The value is too large';
          break;
        case 'pattern':
        default:
          errorMessage = 'The value does not match the expected pattern';
          break;
      }
    }
  }

  return errorMessage ?? '';
}
