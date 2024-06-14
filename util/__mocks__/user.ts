import { UserContext } from '@contexts/user/UserContext';
import type { UserDoc } from '@interfaces/user';
import AppProvider from '@test/contexts/app/AppProvider';
import { renderHook } from '@testing-library/react-native';
import type User from '@util/user';
import deepMerge from 'deepmerge';
import { useContext } from 'react';
import type { DeepReadonly } from 'utility-types';

const ActualUser: typeof User = jest.requireActual('@util/user').default;

/**
 * The default {@link UserDoc} object.
 */
export const defaultUserDoc: DeepReadonly<UserDoc> = {
  address: {
    apartmentSuite: 'Apt 123',
    city: 'Cityville',
    state: 'NY',
    street: '123 Main St',
    zip: '12345',
  },
  displayName: 'User Name',
  email: 'username@mail.com',
  phoneNumber: '123-456-7890',
  photoURL: 'https://www.example.com/user.jpg',
};

/**
 * Generates a {@link UserDoc} object that can be used as mock data.
 *
 * @returns A {@link UserDoc} object.
 */
export const genUserDoc = () => deepMerge({}, defaultUserDoc as UserDoc);

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
 * The `@util/user` module mock.
 */
const UserMock = jest.fn<User, [UserDoc]>().mockImplementation((docData: UserDoc = genUserDoc()) => {
  const user = new ActualUser(docData);

  jest.spyOn(user, 'emailVerified', 'get').mockReturnValue(true);
  jest.spyOn(user, 'isAnonymous', 'get').mockReturnValue(false);
  jest.spyOn(user, 'isAuthenticated', 'get').mockReturnValue(true);
  jest.spyOn(user, 'rawData', 'get').mockReturnValue({ authUser: null, docData });
  jest.spyOn(user, 'reload').mockImplementation(() => Promise.resolve());
  jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve());
  jest.spyOn(user, 'sendEmailVerification').mockImplementation(() => Promise.resolve());
  jest.spyOn(user, 'updatePassword').mockImplementation(() => Promise.resolve());

  return user;
});

export default UserMock;
