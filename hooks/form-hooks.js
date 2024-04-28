import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * Custom hook to derive the form control.
 *
 * @param {Object} props The form field component properties.
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
 * @param {Types.Form.ValidationRules} rules The form field {@link Types.Form.ValidationRules ValidationRules}.
 * @param {object} props The form field component properties.
 * @param {string} [props.errorMessage=''] The custom error message.
 * @param {string} [props.name=''] The name of the form field.
 * @returns {string} The error message.
 */
export function useFormErrorMessage(rules, { errorMessage = '', name = '' }) {
  const form = useFormContext();
  const error = form?.formState.errors[name];

  return useMemo(() => {
    let derivedErrorMessage = errorMessage;

    // Derive error message if not explicitly set
    if (!derivedErrorMessage && error) {
      // Derive error message from rules messages
      derivedErrorMessage = error.message?.toString();

      // Derive default error message from error type
      if (!derivedErrorMessage) {
        switch (error.type) {
          case 'required':
            derivedErrorMessage = 'This field is required';
            break;
          case 'min':
            derivedErrorMessage = rules?.min != null
              ? `This value must be at least ${rules.min}`
              : 'This value is too small';
            break;
          case 'max':
            derivedErrorMessage = rules?.max != null
              ? `This value must be at most ${rules.max}`
              : 'This value is too large';
            break;
          case 'minLength':
            derivedErrorMessage = rules?.minLength != null
              ? `Must be at least ${rules.minLength} characters`
              : 'The character count is too small';
            break;
          case 'maxLength':
            derivedErrorMessage = rules?.maxLength != null
              ? `Must be at most ${rules.maxLength} characters`
              : 'The character count is too large';
            break;
          case 'pattern':
          default:
            derivedErrorMessage = 'The value does not match the expected pattern';
            break;
        }
      }
    }

    return derivedErrorMessage ?? '';
  }, [error, errorMessage, rules]);
}

/**
 * Custom hook to derive a memoized form field {@link Types.Form>validationRule ValidationRule}
 * object with {@link value} and {@link message} members.
 *
 * @template TValidationValue The validation rule value type.
 * @param {Object} props The form field validation rule properties.
 * @param {TValidationValue} props.value The validation rule value.
 * @param {Types.Form.Message} props.message The validation rule message.
 * @returns {Types.Form.ValidationValueMessage<TValidationValue>} The memoized form field {@link Types.Form.ValidationRule ValidationRule}.
 */
export function useValidationRule({ value, message }) {
  return useMemo(() => ({
    value,
    message,
  }), [value, message]);
}

/**
 * Custom hook to derive a memoized form field match validator.
 *
 * @template {Types.Form.FieldValues} TFieldValues The form field values type.
 * @template {Types.Form.FieldPath<TFieldValues>} TFieldName The form field name type.
 * @param {Types.Form.UseFormReturn<TFieldValues>} form The {@link Types.Form.UseFormReturn Form} instance.
 * @param {TFieldName} fieldName The name of the form field to match.
 * @param {string} [message=`${fieldName} must match`] The error message. Defaults to `${fieldName} must match`.
 * @returns {Types.Form.ValidateFn<TFieldValues, TFieldName>} The form field match validator function.
 */
export function useMatchValidator(form, fieldName, message = '') {
  return useCallback((value) =>
    value === form.getValues(fieldName) || message || `${fieldName} must match`,
  [message, fieldName, form]);
}

/**
 * Custom hook to generate {@link SubmitState} for a submittable form.
 *
 * @template {Types.Form.FieldValues} TFieldValues The form field values type.
 * @template TResult The submit result type.
 * @param {Types.Form.UseFormReturn<TFieldValues>} [form] The {@link Types.Form.UseFormReturn Form} instance.
 * @param {(result: TResult) => void} [onSubmitSuccess] The submit success callback.
 * @returns {Types.Form.SubmitState<TFieldValues, TResult>} The {@link Types.Form.SubmitState SubmitState}.
 */
export function useSubmitState(form, onSubmitSuccess) {
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
      onSubmitSuccess?.(result);
    } catch (error) {
      // Handle form submit error
      setSubmitError(error.message);
      afterSubmitCbs?.onError?.(error);
    } finally {
      setSubmitting(false);
      afterSubmitCbs?.onFinally?.();
    }

    return result;
  }, [form, onSubmitSuccess, submitting]);

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
 * Custom hook to generate memoized validation rules with default messages.
 *
 * @param {Types.Form.ValidationRules} rules The form {@link Types.Form.ValidationRules ValidationRules}.
 * @param {string} [label] The form field label, used in default messages.
 * @returns {Types.Form.ValidationRules} The memoized form {@link Types.Form.ValidationRules ValidationRules}.
 */
export function useValidationRules({ max, maxLength, min, minLength, pattern, required, validate }, label = '') {
  return useMemo(() => ({
    max: (typeof max === 'number')
      ? {
        message: `${label || 'This value'} must be at most ${max}`,
        value: max,
      }
      : max,
    maxLength: (typeof maxLength === 'number')
      ? {
        message: `${label || 'This value'} must be at most ${maxLength} characters`,
        value: maxLength,
      }
      : maxLength,
    min: (typeof min === 'number')
      ? {
        message: `${label || 'This value'} must be at least ${min}`,
        value: min,
      }
      : min,
    minLength: (typeof minLength === 'number')
      ? {
        message: `${label || 'This value'} must be at least ${minLength} characters`,
        value: minLength,
      }
      : minLength,
    pattern: (pattern instanceof RegExp)
      ? {
        message: `${label || 'This value'} does not match the expected pattern`,
        value: pattern,
      }
      : pattern,
    required: (required === true)
      ? {
        message: `${label || 'This field'} is required`,
        value: true,
      }
      : required,
    validate,
  }), [label, max, maxLength, min, minLength, pattern, required, validate]);
}
