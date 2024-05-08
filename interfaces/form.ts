import { Control, FieldPath, FieldPathValue, FieldValues, Path, RegisterOptions, SubmitErrorHandler, SubmitHandler, UseFormHandleSubmit, Validate } from 'react-hook-form';

/**
 * After (form) submit callback functions.
 *
 * @template TResult The type of the form submission result.
 */
export interface AfterSubmitCbs<TResult = any> {

  /**
   * Callback function invoked after form submission is successful.
   *
   * @param result The result of the form submission.
   */
  onSuccess?: (result?: TResult) => void;

  /**
   * Callback function invoked after form submission failed.
   *
   * @param error The error that occurred during form submission.
   */
  onError?: (error: any) => void;

  /**
   * Callback function invoked after form submission is complete.
   */
  onFinally?: () => void;

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
  TFieldName extends Path<TFieldValues> = FieldPath<TFieldValues>
> {

  /**
   * The {@link Control} for the form.
   *
   * `Note`: Designates this form field as controlled by a `react-hook-form`.
   *
   * The form field will be registered with the form {@link Control} and its value will be managed by the form {@link Control}.
   *
   * The form field will also be validated by the form {@link Control} based on the {@link rules} provided.
   *
   * If set, it is not recommended to directly set the form field value or listen to changes on the form field value.
   */
  control?: Control<TFieldValues, TContext>;

  /**
   * The error message to display for the form field.
   *
   * `Note`: If controlled with `react-hook-form`, the error message is implicitly derived from {@link rules}.
   * If set explicitly in such a case, the explicit error message will be displayed instead.
   */
  errorMessage?: string;

  /**
   * The name of the form field.
   *
   * `Required` if using `react-hook-form` {@link control}; ignored otherwise.
   */
  name?: TFieldName;

}

/**
 * State information about form submission.
 *
 * @template TFieldValues The type of the form data.
 * @template TResult The submit result type.
 */
export interface SubmitState<TFieldValues extends FieldValues = FieldValues, TResult = any> {

  /**
   * Form {@link UseFormHandleSubmit} that also maintains the {@link SubmitState} of the form.
   * Automatically sets the {@link SubmitState} before and after form submission.
   *
   * @param onValid The {@link SubmitHandler} to invoke after form passes validation.
   * @param onInvalid The {@link SubmitErrorHandler} to invoke when the form failed validation.
   * @returns Callback function.
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
   * @template SubmitCb The type of the submit handler.
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
  handleSubmitState: UseHandleSubmitState<TResult>;

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
 * The submit handler for form submission.
 *
 * @template TResult The submit result type.
 * @param args The arguments to pass to the submit handler.
 * @returns The result of the form submission.
 */
export type UseHandleSubmitState<TResult> = <SubmitCb extends (...args: any[]) => Promise<TResult>>(
  onSubmit: SubmitCb,
  afterSubmitCbs?: AfterSubmitCbs<TResult>
) => SubmitCb

/**
 * Validate function for form validation rules.
 *
 * @param TFieldValues The type of the form data.
 * @param TFieldName The form field name.
 */
export type ValidateFn<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = FieldPath<TFieldValues>
>
  = Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>
  | Record<string, Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>>

/**
 * Form validation rules.
 */
export type ValidationRules<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = FieldPath<TFieldValues>
>
  = Omit<
    RegisterOptions<TFieldValues, TFieldName>,
    'deps' | 'disabled' | 'onBlur' | 'onChange' | 'setValueAs' | 'ShouldUnregister'
    | 'value' | 'valueAsDate' | 'valueAsNumber'
  >;
