import { User } from '@util/user';
import { createContext } from 'react';

/**
 * A context that provides the authenticated {@link User} instance.
 *
 * @type {React.Context<User>}
 */
export const UserContext = createContext(null);
