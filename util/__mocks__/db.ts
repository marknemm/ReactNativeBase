/**
 * Mocks the `listenDBDoc` function.
 */
export const listenDBDoc = jest.fn((collectionPath, documentPath, onSuccess, onError) => {
  onSuccess({ id: 0 });
  return () => {};
});
