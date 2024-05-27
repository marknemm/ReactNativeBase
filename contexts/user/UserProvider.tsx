import User from '@util/user';
import { UserContext } from './UserContext';

/**
 * Provides the authenticated {@link User} instance.
 *
 * @param props The component {@link Props}.
 * @returns The {@link UserProvider} component.
 */
const UserProvider: React.FC<Props> = ({ children, user }) => (
  <UserContext.Provider value={user}>
    { children }
  </UserContext.Provider>
);

/**
 * The {@link UserProvider} component properties.
 */
interface Props {

  /**
   * The children components.
   */
  children: React.ReactNode;

  /**
   * The {@link User}.
   */
  user: User;

}

export default UserProvider;
