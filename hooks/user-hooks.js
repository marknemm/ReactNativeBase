import { UserContext } from '@contexts/user/UserContext';
import { User } from '@util/user';
import { useContext } from 'react';

/**
 * A hook that provides the {@link User} instance.
 *
 * @returns {User} The {@link User} instance.
 */
export function useUser() {
  return useContext(UserContext);
}
