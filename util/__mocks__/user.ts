import type { UserDoc } from '@interfaces/user';
import type User from '@util/user';
import deepMerge from 'deepmerge';
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
 * The `@util/user` module mock.
 */
const UserMock = jest.fn<User, [UserDoc]>().mockImplementation((docData?: UserDoc) => {
  const user = new ActualUser(docData);

  user.reload = jest.fn().mockImplementation(() => Promise.resolve());
  user.save = jest.fn().mockImplementation(() => Promise.resolve());
  user.sendEmailVerification = jest.fn().mockImplementation(() => Promise.resolve());
  user.updatePassword = jest.fn().mockImplementation(() => Promise.resolve());

  return user;
});

export default UserMock;
