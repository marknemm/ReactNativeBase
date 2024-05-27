import { UserContext } from '@contexts/user/UserContext';
import User from '@util/user';
import { useContext } from 'react';

/**
 * Custom hook that provides the {@link User} instance.
 *
 * @returns The {@link User} instance.
 */
export function useUser(): User {
  return useContext(UserContext);
}
