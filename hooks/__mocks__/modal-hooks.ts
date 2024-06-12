/**
 * Mocks the useModal hook.
 */
export const useModal = jest.fn().mockImplementation((isVisible, renderModal) => {
  if (isVisible) {
    renderModal();
  }
});
