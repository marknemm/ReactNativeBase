import { User } from '@util/user';
import { createContext } from 'react';

/**
 * A context that provides the authenticated {@link User} instance.
 */
export const UserContext: React.Context<User> = createContext(null);
