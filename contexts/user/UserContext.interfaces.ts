import type User from '@util/user';
import type { PropsWithChildren } from 'react';
import type UserProvider from './UserProvider';

/**
 * The {@link UserProvider} component properties.
 */
export interface UserProviderProps extends PropsWithChildren {

  /**
   * The {@link User}.
   */
  user: User;

}
