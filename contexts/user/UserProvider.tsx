import type User from '@util/user';
import { UserContext } from './UserContext';
import type { UserProviderProps } from './UserContext.interfaces';

/**
 * Provides the authenticated {@link User} instance.
 *
 * @param props The component {@link UserProviderProps}.
 * @returns The {@link UserProvider} component.
 */
const UserProvider: React.FC<UserProviderProps> = ({ children, user }) => (
  <UserContext.Provider value={user}>
    { children }
  </UserContext.Provider>
);

export type * from './UserContext.interfaces';
export default UserProvider;
