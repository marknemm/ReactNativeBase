import { FormFieldProps, SubmitState, UseHandleSubmitState, ValidateFn, ValidationRules } from '@interfaces/form';
import { StateSetter } from '@interfaces/state';
import { useCallback, useMemo, useState } from 'react';
import { Control, FieldPath, FieldValues, Message, Path, UseFormReturn, ValidationValue, ValidationValueMessage, useFormContext } from 'react-hook-form';

/**
 * Custom hook to derive the form control.
 *
 * @param props The form field component {@link FormFieldProps properties}.
 * @returns The form {@link Control}.
 * @throws The name property is required when using form controls.
 */
export function useFormControl(props: FormFieldProps): Control {
  let { control } = props;
  const form = useFormContext();

  if (!control && form) {
    control = form.control;
  }

  if (control && !props.name) {
    throw new Error('The name property is required when using form controls.');
  }

  return control;
}

/**
 * Custom hook to derive form error messages.
 *
 * @param rules The form field {@link ValidationRules}.
 * @param props The form field component {@link FormFieldProps properties}.
 * @returns The error message.
 */
export function useFormErrorMessage(rules: ValidationRules, props: FormFieldProps): string {
  const { errorMessage, name } = props;
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
 * Custom hook to derive a memoized form field {@link ValidationValueMessage}
 * object with {@link value} and {@link message} members.
 *
 * @template TValidationValue The validation rule value type.
 * @param props The form field validation rule properties.
 * @param props.value The {@link ValidationValue}.
 * @param props.message The validation {@link Message}.
 * @returns The memoized form field {@link ValidationValueMessage}.
 */
export function useValidationRule<TValidationValue extends ValidationValue = ValidationValue>({
  value,
  message,
}: ValidationValueMessage<TValidationValue>): ValidationValueMessage<TValidationValue> {
  return useMemo(() => ({
    value,
    message,
  }), [value, message]);
}

/**
 * Custom hook to derive a memoized form field match validator.
 *
 * @template TFieldValues The form field values type.
 * @template TFieldName The form field name type.
 * @param form The {@link UseFormReturn Form} instance.
 * @param fieldName The name of the form field to match.
 * @param message The error message. Defaults to `${fieldName} must match`.
 * @returns The form field match {@link ValidateFn}.
 */
export function useMatchValidator<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = FieldPath<TFieldValues>
>(
  form: UseFormReturn<TFieldValues>,
  fieldName: TFieldName,
  message = ''
): ValidateFn<TFieldValues, TFieldName> {
  return useCallback((value: TFieldValues[TFieldName]) =>
    value === form.getValues(fieldName) || message || `${fieldName} must match`,
  [message, fieldName, form]);
}

/**
 * Custom hook to generate {@link SubmitState} for a submittable form.
 *
 * @template TFieldValues The form field values type.
 * @template TResult The submit result type.
 * @param form The {@link UseFormReturn Form} instance.
 * @param onSubmitSuccess The submit success callback.
 * @returns The {@link SubmitState}.
 */
export function useSubmitState<
  TFieldValues extends FieldValues = FieldValues,
  TResult = any
>(
  form?: UseFormReturn<TFieldValues>,
  onSubmitSuccess?: (result: TResult) => void
): SubmitState<TFieldValues, TResult> {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccessful, setSubmitSuccessful] = useState(false);

  const handleSubmitState = useHandleSubmitState<TFieldValues, TResult>(
    form,
    submitting,
    onSubmitSuccess,
    setSubmitError,
    setSubmitSuccessful,
    setSubmitting
  );

  const handleSubmit = useCallback((onValid: (formValue: TFieldValues) => any, onInvalid: (error: any) => void) =>
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
 * Custom hook to generate a memoized form submit state handler.
 *
 * @template TFieldValues The form field values type.
 * @template TResult The submit result type.
 * @param form The {@link UseFormReturn Form} instance.
 * @param submitting The submitting state of the form.
 * @param onSubmitSuccess The submit success callback.
 * @param setSubmitError The form submit error setter.
 * @param setSubmitSuccessful The form submit successful setter.
 * @param setSubmitting The form submitting setter.
 * @returns The memoized form submit state handler.
 */
function useHandleSubmitState<TFieldValues = FieldValues, TResult = any>(
  form: UseFormReturn<TFieldValues>,
  submitting: boolean,
  onSubmitSuccess: (result: TResult) => void | null,
  setSubmitError: StateSetter<string>,
  setSubmitSuccessful: StateSetter<boolean>,
  setSubmitting: StateSetter<boolean>
): UseHandleSubmitState<TResult> {
  return useCallback((onSubmit, afterSubmitCbs?) =>
    async (...args) => {
      if (submitting) return null; // Prevent multiple submissions
      let result: TResult;

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
      } catch (error: any) {
        // Handle form submit error
        setSubmitError(error.message);
        afterSubmitCbs?.onError?.(error);
      } finally {
        setSubmitting(false);
        afterSubmitCbs?.onFinally?.();
      }

      return result;
    },
  [
    form,
    onSubmitSuccess,
    setSubmitError,
    setSubmitSuccessful,
    setSubmitting,
    submitting,
  ]) as UseHandleSubmitState<TResult>;
}

/**
 * Custom hook to generate memoized validation rules with default messages.
 *
 * @param rules The form {@link ValidationRules}.
 * @param label The form field label, used in default messages.
 * @returns The memoized form {@link ValidationRules}.
 */
export function useValidationRules(rules: ValidationRules, label = ''): ValidationRules {
  return useMemo(() => ({
    max: (typeof rules.max === 'number')
      ? {
        message: `${label || 'This value'} must be at most ${rules.max}`,
        value: rules.max,
      }
      : rules.max,
    maxLength: (typeof rules.maxLength === 'number')
      ? {
        message: `${label || 'This value'} must be at most ${rules.maxLength} characters`,
        value: rules.maxLength,
      }
      : rules.maxLength,
    min: (typeof rules.min === 'number')
      ? {
        message: `${label || 'This value'} must be at least ${rules.min}`,
        value: rules.min,
      }
      : rules.min,
    minLength: (typeof rules.minLength === 'number')
      ? {
        message: `${label || 'This value'} must be at least ${rules.minLength} characters`,
        value: rules.minLength,
      }
      : rules.minLength,
    pattern: (rules.pattern instanceof RegExp)
      ? {
        message: `${label || 'This value'} does not match the expected pattern`,
        value: rules.pattern,
      }
      : rules.pattern,
    required: (rules.required === true)
      ? {
        message: `${label || 'This field'} is required`,
        value: true,
      }
      : rules.required,
    validate: rules.validate,
  }), [label, rules.max, rules.maxLength, rules.min, rules.minLength, rules.pattern, rules.required, rules.validate]);
}
