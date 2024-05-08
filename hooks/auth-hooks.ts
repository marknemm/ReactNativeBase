import { AuthState } from '@interfaces/auth';
import auth from '@react-native-firebase/auth';
import { reloadAuthUser } from '@util/auth';
import { listenDBDoc } from '@util/db';
import { Predicate, resolvePredicate } from '@util/predicate';
import { User } from '@util/user';
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that gets the current authenticated {@link User} and its loading state.
 *
 * `NOTE`: This hook should likely not be used, and instead, the `useUser` hook should be used to get the authenticated {@link User}.
 *
 * @returns An {@link AuthState} object that contains the current authenticated user and its loading state.
 */
export function useAuthState(): AuthState {
  const [authUser, setAuthUser] = useState(auth().currentUser);
  const [user, setUser] = useState(authUser?.isAnonymous ? new User(null) : null);
  const [userLoading, setUserLoading] = useState(!user);

  // Listen for changes to the authenticated user.
  useEffect(() => auth().onUserChanged((newAuthUser) => {
    setAuthUser(newAuthUser);
    setUser((prevUser) => (
      newAuthUser?.isAnonymous
        ? new User(null)
        : (prevUser && prevUser?.uid === newAuthUser?.uid)
          ? new User(prevUser.rawData.docData)
          : null
    ));
    setUserLoading(newAuthUser && !newAuthUser?.isAnonymous);
  }), []);

  // Get the user document from the database if the authenticated user changes and it is not anonymous.
  useEffect(() => {
    if (!authUser || authUser.isAnonymous) return () => {};

    return listenDBDoc('users', authUser.uid, (docData) => { // Must listen in-case result of sign up which will create new user doc.
      setUser(new User(docData));
      setUserLoading(false);
    });
  }, [authUser]);

  return { authUser, user, userLoading };
}

/**
 * Custom hook that refreshes the authenticated {@link User} at a specified {@link intervalMs}
 * while a given {@link predicate} is `true` and the user is authenticated.
 *
 * @param predicate The {@link Predicate} that determines if the refresh should occur. Defaults to `true`.
 * @param intervalMs The refresh interval in milliseconds. Defaults to `3000` milliseconds.
 * @returns The interval reference.
 */
export function useAuthRefresh(
  predicate: Predicate = true,
  intervalMs = 3000
): React.MutableRefObject<NodeJS.Timeout> {
  const intervalRef = useRef(null);

  useEffect(() => {
    let predicateVal = resolvePredicate(predicate);

    if (predicateVal && auth().currentUser) {
      reloadAuthUser();

      intervalRef.current = setInterval(() => {
        predicateVal = resolvePredicate(predicate);

        (predicateVal && auth().currentUser)
          ? reloadAuthUser()
          : clearInterval(intervalRef.current);
      }, intervalMs);
    }

    return () => clearInterval(intervalRef.current);
  }, [intervalMs, predicate]);

  return intervalRef;
}
