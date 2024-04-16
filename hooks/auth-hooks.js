import auth from '@react-native-firebase/auth';
import { listenDBDoc } from '@util/db';
import { User } from '@util/user';
import { useEffect, useState } from 'react';
import { useUser } from './user-hooks';

/**
 * A hook that gets the current authenticated {@link User} and its loading state.
 *
 * `NOTE`: This hook should likely not be used, and instead, the {@link useUser} hook should be used to get the authenticated {@link User}.
 *
 * @returns {Types.Auth.AuthState} An {@link Types.Auth.AuthState auth state} object that contains the current authenticated user and its loading state.
 */
export function useAuthState() {
  const [authUser, setAuthUser] = useState(auth().currentUser);
  const [user, setUser] = useState(authUser?.isAnonymous ? new User(null, authUser) : null);
  const [userLoading, setUserLoading] = useState(!user);

  // Listen for changes to the authenticated user.
  useEffect(() => auth().onAuthStateChanged((usr) => {
    setAuthUser(usr);
    setUser(usr?.isAnonymous ? new User(null, usr) : null);
    setUserLoading(usr && !usr.isAnonymous);
  }), []);

  // Get the user document from the database if the authenticated user changes and it is not anonymous.
  useEffect(() => {
    if (!authUser || authUser.isAnonymous) return () => {};

    return listenDBDoc('users', authUser.uid, (docData) => { // Must listen in-case result of sign up which will create new user doc.
      setUser(new User(docData, authUser));
      setUserLoading(false);
    });
  }, [authUser]);

  return { authUser, user, userLoading };
}
