/**
 * Mocks the firebase auth `getAuthUser` function.
 */
export const getAuthUser = jest.fn().mockReturnValue({
  emailVerified: true,
  isAnonymous: false,
  uid: '1234567890',
});
