import auth from '@react-native-firebase/auth';
import { listenDBDoc } from '@util/db';
import { User } from '@util/user';
import { useEffect, useRef, useState } from 'react';
import { useUser } from './user-hooks';
import { log } from '@util/log';

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
  useEffect(() => auth().onUserChanged((newAuthUser) => {
    setAuthUser(newAuthUser);
    setUser((prevUser) => (
      newAuthUser?.isAnonymous
        ? new User(null, newAuthUser)
        : (prevUser && prevUser?.uid === newAuthUser?.uid)
          ? new User(prevUser.rawData.docData, newAuthUser)
          : null
    ));
    setUserLoading(newAuthUser && !newAuthUser?.isAnonymous);
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

/**
 * A hook that refreshes the authenticated {@link User} at a specified {@link intervalMs}
 * while a given {@link predicate} is `true` and the user is authenticated.
 *
 * @param {boolean | (() => boolean)} [predicate=true] The predicate that determines if the refresh should occur. Defaults to `true`.
 * @param {number} [intervalMs=3000] The refresh interval in milliseconds. Defaults to `3000` milliseconds.
 * @returns {React.MutableRefObject<NodeJS.Timeout>} The interval reference.
 */
export function useAuthRefresh(predicate = true, intervalMs = 3000) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (predicate && auth().currentUser) {
      auth().currentUser.reload();

      intervalRef.current = setInterval(() => {
        (predicate && auth().currentUser)
          ? auth().currentUser?.reload()
          : clearInterval(intervalRef.current);
      }, intervalMs);
    }

    return () => clearInterval(intervalRef.current);
  }, [intervalMs, predicate]);

  return intervalRef;
}
