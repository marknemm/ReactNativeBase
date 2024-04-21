import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * Custom hook to generate {@link SubmitState} for a submittable form.
 *
 * @template {Types.Form.FieldValues} TFieldValues The form field values type.
 * @param {Types.Form.UseFormReturn<TFieldValues>} [form] The {@link Types.Form.UseFormReturn Form} instance.
 * @returns {Types.Form.SubmitState<TFieldValues>} The {@link Types.Form.SubmitState SubmitState}.
 */
export function useSubmitState(form) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccessful, setSubmitSuccessful] = useState(false);

  const handleSubmitState = useCallback((onSubmit, afterSubmitCbs) => async (...args) => {
    if (submitting) return null; // Prevent multiple submissions
    let result;

    // Set form submit state
    setSubmitError('');
    setSubmitSuccessful(false);
    setSubmitting(true);

    try {
      // Handle form submit via onValid callback and handle success
      result = await onSubmit(...args);
      setSubmitSuccessful(true);
      if (form?.formState.isDirty) {
        form.reset(form.getValues()); // Make form pristine
      }
      afterSubmitCbs?.onSuccess?.(result);
    } catch (error) {
      // Handle form submit error
      setSubmitError(error.message);
      afterSubmitCbs?.onError?.(error);
    } finally {
      setSubmitting(false);
      afterSubmitCbs?.onFinally?.();
    }

    return result;
  }, [form, submitting]);

  const handleSubmit = useCallback((onValid, onInvalid) =>
    form?.handleSubmit(handleSubmitState(onValid), onInvalid),
  [form, handleSubmitState]);

  return useMemo(() => ({
    handleSubmit,
    handleSubmitState,
    setSubmitError,
    setSubmitSuccessful,
    setSubmitting,
    submitError,
    submitSuccessful,
    submitting,
  }), [handleSubmit, handleSubmitState, submitError, submitSuccessful, submitting]);
}

/**
 * Custom hook to derive the form control.
 *
 * @param {Object} props The component properties.
 * @param {Types.Form.Control} [props.control] The form {@link Types.Form.Control control}.
 * @param {string} [props.name=''] The name of the form {@link Types.Form.Control control}.
 * @returns {Types.Form.Control} The form {@link Types.Form.Control control}.
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
 * @param {Types.Form.FormFieldProps} props The component {@link Types.Form.FormFieldProps properties}.
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
