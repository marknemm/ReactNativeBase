import { Control, FieldErrors, FieldPath, FieldValues, SubmitErrorHandler, SubmitHandler, RegisterOptions, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { TextStyle } from 'react-native';

export * from 'react-hook-form';

/**
 * State information about form submission.
 *
 * @template {FieldValues} [TFieldValues=FieldValues] The type of the form data.
 */
export interface SubmitState<TFieldValues> {

  /**
   * Form {@link UseFormHandleSubmit} that also maintains the {@link SubmitState} of the form.
   * Automatically sets the {@link SubmitState} before and after form submission.
   *
   * @param onValid The {@link SubmitHandler} to invoke after form passes validation.
   * @param onInvalid The {@link SubmitErrorHandler} to invoke when the form failed validation.
   * @returns Callback function.
   *
   * @example
   *
   * const onValid = (data) => console.log(data);
   * const onInvalid = (error) => console.error(error);
   *
   * <Button onPress={handleSubmit(onValid, onInvalid)} />
   */
  handleSubmit: UseFormHandleSubmit<TFieldValues>;

  /**
   * Maintains the {@link SubmitState} of the form on submission.
   * Automatically sets the {@link SubmitState} before and after form submission.
   *
   * @template {Function} [Submit=SubmitHandler] The type of the submit handler.
   * @param onSubmit The callback function that submits the form data.
   * @param afterSubmitCbs Callback functions for handling form submission results.
   * @param afterSubmitCbs.onSuccess Callback function invoked after form submission is successful.
   * @param afterSubmitCbs.onError Callback function invoked after form submission failed.
   * @param afterSubmitCbs.onFinally Callback function invoked after form submission is complete.
   * @example
   *
   * const onSubmit = handleSubmitState((data) => console.log(data));
   * const onError = (error) => console.error(error);
   *
   * <Button onPress={handleSubmit(onSubmit, onError)} />
   */
  handleSubmitState: (
    onSubmit: Submit,
    afterSubmitCbs?: {
      onSuccess?: (result?: any) => void;
      onError?: (error: any) => void;
      onFinally?: () => void;
    }
  ) => Submit;

  /**
   * Sets the form submit error message that shall be displayed to the user.
   */
  setSubmitError: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Sets the submit successful state of the form.
   */
  setSubmitSuccessful: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Sets the submitting state of the form.
   */
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * The form submit error message to display to the user.
   */
  submitError: string;

  /**
   * The submit successful state of the form.
   */
  submitSuccessful: boolean;

  /**
   * The submitting state of the form.
   */
  submitting: boolean;

}

/**
 * {@link FormFieldProps Properties} for form field components.
 *
 * @param TFieldValues The type of the form data.
 * @param TContext The type of the form context.
 * @param TFieldName The form field name.
 */
export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TFieldName extends FieldPath<TFieldValues> = keyof TFieldValues
> {

  /**
   * The control for the form.
   */
  control?: Control<TFieldValues, TContext>;

  /**
   * The error message to display for the form field.
   */
  errorMessage?: string;

  /**
   * The errors associated with the form control.
   */
  errors?: FieldErrors<TFieldValues>;

  /**
   * The name of the form field.
   */
  name?: TFieldName;

  /**
   * The input validation rules for the form field.
   */
  rules?: Omit<RegisterOptions<TFieldValues, TFieldName>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">;

  /**
   * The rules to error message map for the form field. Maps rules (error types) to error messages.
   */
  rulesErrorMessageMap?: Record<string, string>;

}

/**
 * Properties for `FormError` components.
 *
 * @param TFieldValues The type of the form data.
 * @param TContext The type of the form context.
 * @param TFieldName The form field name.
 */
export interface FormErrorProps<
  TFieldValues,
  TContext,
  TFieldName
> extends FormFieldProps<TFieldValues, TContext, TFieldName> {

  /**
   * The style for the error message.
   */
  style?: TextStyle;

}
