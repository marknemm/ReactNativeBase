import { renderHook } from '@testing-library/react-native';
import { useForm, type DefaultValues, type UseFormReturn } from 'react-hook-form';

/**
 * Generate a mock form for testing.
 *
 * @template T The type of the form.
 * @param defaultValues Default values for the form.
 * @returns A mock {@link UseFormReturn}.
 */
export function genMockForm<
  T = DefaultMockFormT
>(
  defaultValues: DefaultValues<T> = { field1: 'value1', field2: 'value2' } as any
): UseFormReturn<T> {
  return renderHook(() =>
    useForm({ defaultValues })
  ).result.current;
}

/**
 * Mock for `useSubmitState` hook.
 */
export const useSubmitState = jest.fn().mockImplementation(() => {
  let submitError = '';
  let submitSuccessful = false;
  let submitting = false;

  return {
    handleSubmit: jest.fn().mockImplementation((submitFn) => async () => { await submitFn(); }),
    handleSubmitState: jest.fn().mockImplementation((submitFn) => async () => { await submitFn(); }),
    setSubmitError: jest.fn().mockImplementation((error) => {
      submitError = error;
    }),
    setSubmitSuccessful: jest.fn().mockImplementation((successful) => {
      submitSuccessful = successful;
    }),
    setSubmitting: jest.fn().mockImplementation((submittingState) => {
      submitting = submittingState;
    }),
    submitError,
    submitSuccessful,
    submitting,
  };
});

/**
 * Default type for the mock form.
 */
export type DefaultMockFormT = {

  /**
   * Form field 1.
   */
  field1: string;

  /**
   * Form field 2.
   */
  field2: string;

};
