import { useFormContext } from 'react-hook-form';

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
  const form = useFormContext();

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
 * @param {Types.FormField.FormFieldProps} props The component {@link Types.FormField.FormFieldProps properties}.
 * @returns {string} The error message.
 */
export function useFormErrorMessage({ errorMessage = '', rulesErrorMessageMap, errors, name = '', rules }) {
  const form = useFormContext();
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
        case 'minLength':
          errorMessage = rules?.minLength != null
            ? `Must be at least ${rules.minLength} characters`
            : 'The character count is too small';
          break;
        case 'maxLength':
          errorMessage = rules?.maxLength != null
            ? `Must be at most ${rules.maxLength} characters`
            : 'The character count is too large';
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
