import { UserContext } from '@contexts/user/UserContext';
import User from '@util/user';
import { type PropsWithChildren } from 'react';

jest.mock('@util/user');

/**
 * The singleton mock {@link User} instance to provide to the test application.
 */
const mockUser = new User();

/**
 * Provides a singleton mock {@link User} instance to the test application.
 *
 * @param props The component {@link PropsWithChildren props}.
 * @returns The {@link UserProvider} component.
 */
const UserProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <UserContext.Provider value={mockUser}>
    { children }
  </UserContext.Provider>
);

export default UserProvider;
