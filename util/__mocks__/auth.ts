import { FirebaseAuthTypes } from '@react-native-firebase/auth';

/**
 * Generates a mock authenticated user.
 *
 * @param seed The seed number to use for user data generation.
 * @param userData Custom user data to merge with the default mock user.
 * @returns The generated mock authenticated user.
 */
export const genMockAuthUser = (seed = 0, userData: Partial<FirebaseAuthTypes.User> = {}): FirebaseAuthTypes.User => ({
  displayName: `User Name${seed}`,
  email: `username${seed}@mail.com`,
  emailVerified: true,
  isAnonymous: userData.uid === null,
  metadata: null,
  multiFactor: null,
  phoneNumber: `123-456-789${seed % 10}`,
  photoURL: `https://www.example.com/user${seed}.jpg`,
  providerData: [],
  providerId: 'password',
  uid: `uid-${seed}`,
  delete: jest.fn().mockResolvedValue(null),
  getIdToken: jest.fn().mockResolvedValue(''),
  getIdTokenResult: jest.fn().mockResolvedValue({} as any),
  linkWithCredential: jest.fn().mockResolvedValue({} as any),
  linkWithPopup: jest.fn().mockResolvedValue({} as any),
  linkWithRedirect: jest.fn().mockResolvedValue({} as any),
  reauthenticateWithCredential: jest.fn().mockResolvedValue({} as any),
  reauthenticateWithProvider: jest.fn().mockResolvedValue({} as any),
  reload: jest.fn().mockResolvedValue(null),
  sendEmailVerification: jest.fn().mockResolvedValue(null),
  verifyBeforeUpdateEmail: jest.fn().mockResolvedValue(null),
  toJSON: jest.fn().mockReturnValue({}),
  unlink: jest.fn().mockResolvedValue(null),
  updateEmail: jest.fn().mockResolvedValue(null),
  updatePassword: jest.fn().mockResolvedValue(null),
  updatePhoneNumber: jest.fn().mockResolvedValue(null),
  updateProfile: jest.fn().mockResolvedValue(null),
  ...userData,
});

/**
 * Mocks the `getAuthUser` function.
 */
export const getAuthUser = jest.fn().mockReturnValue(genMockAuthUser());

/**
 * Mocks the `onAuthUserChanged` function.
 */
export const onAuthUserChanged = jest.fn().mockImplementation((listener) => {
  listener(genMockAuthUser());
  return () => {};
});

/**
 * Mocks the `reloadAuthUser` function.
 */
export const reloadAuthUser = jest.fn().mockResolvedValue(null);

/**
 * Mocks the `signOut` function.
 */
export const signOut = jest.fn().mockResolvedValue(null);
