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
