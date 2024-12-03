import { UserContext } from '@contexts/user/UserContext';
import { Callback } from '@interfaces/callbacks';
import type { UserDoc } from '@interfaces/user';
import AppProvider from '@test/contexts/app/AppProvider';
import { renderHook } from '@testing-library/react-native';
import type User from '@util/user';
import { useContext } from 'react';

const ActualUser: typeof User = jest.requireActual('@util/user').default;

/**
 * Generates a {@link UserDoc} object that can be used as mock data.
 *
 * @param seed The seed number to use for user data generation.
 * @param userData Custom user data to merge with the default mock user.
 * @returns A {@link UserDoc} object.
 */
export const genUserDoc = (seed = 0, userData: Partial<UserDoc> = {}): UserDoc => ({
  address: {
    apartmentSuite: `Apt ${seed + 100}`,
    city: 'Cityville',
    state: 'NY',
    street: `${seed} Main St`,
    zip: '12345',
  },
  displayName: `User Name${seed}`,
  email: `username${seed}@mail.com`,
  id: `uid-${seed}`,
  phoneNumber: `123-456-789${seed % 10}`,
  photoURL: `https://www.example.com/user${seed}.jpg`,
  ...userData,
});

/**
 * Generates a {@link User} object that can be used as mock data.
 *
 * @param seed The seed number to use for {@link User} data generation.
 * @param userData Custom user data to merge with the default mock user.
 * @returns A {@link User} object.
 */
export const genMockUser = (seed = 0, userData: Partial<UserDoc> = {}): User =>
  new MockUser(genUserDoc(seed, userData));

/**
 * Retrieves the mock {@link User} object from the test {@link UserContext} provided in the test wrapper - {@link AppProvider}.
 *
 * @returns The mock {@link User} object.
 */
export function getMockAuthUser(): User {
  return renderHook(
    () => useContext(UserContext),
    { wrapper: AppProvider }
  ).result.current;
}

/**
 * Mock for the `listenUser` function.
 */
export const listenUser = jest.fn((id: string, onSuccess: Callback<User | null>) => {
  onSuccess(genMockUser(id.charCodeAt(id.length - 1) - 48));
  return () => {};
});

/**
 * Mock for the `loadUser` function.
 */
export const loadUser = jest.fn((id: string) =>
  genUserDoc(id.charCodeAt(id.length - 1) - 48)
);

/**
 * The `@util/user` module mock.
 */
const MockUser = jest.fn<User, [UserDoc]>().mockImplementation((docData: UserDoc = genUserDoc()) => {
  const user = new ActualUser(docData);

  jest.spyOn(user, 'emailVerified', 'get').mockReturnValue(true);
  jest.spyOn(user, 'isAnonymous', 'get').mockReturnValue(!docData?.id);
  jest.spyOn(user, 'isAuthenticated', 'get').mockReturnValue(true);
  jest.spyOn(user, 'rawData', 'get').mockReturnValue({ authUser: null, docData });
  jest.spyOn(user, 'reload').mockImplementation(() => Promise.resolve());
  jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve());
  jest.spyOn(user, 'sendEmailVerification').mockImplementation(() => Promise.resolve());
  jest.spyOn(user, 'updatePassword').mockImplementation(() => Promise.resolve());

  return user;
});

export default MockUser;
