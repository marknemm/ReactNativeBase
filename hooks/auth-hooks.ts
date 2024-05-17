import { AuthState } from '@interfaces/auth';
import { UserDoc } from '@interfaces/user';
import auth from '@react-native-firebase/auth';
import { getAuthUser, reloadAuthUser } from '@util/auth';
import { getDBDoc, listenDBDoc } from '@util/db';
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
  const [authUser, setAuthUser] = useState(getAuthUser());
  const [user, setUser] = useState(authUser?.isAnonymous ? new User(null) : null);
  const [userLoading, setUserLoading] = useState(!user);

  // Listen for changes to the authenticated user.
  useEffect(() => auth().onUserChanged((newAuthUser) => {
    setAuthUser(newAuthUser);
    setUser((prevUser) => (
      newAuthUser?.isAnonymous
        ? new User(null)
        : (prevUser && prevUser?.id === newAuthUser?.uid)
          ? new User(prevUser.rawData.docData)
          : null
    ));
    setUserLoading(newAuthUser && !newAuthUser?.isAnonymous);
  }), []);

  // Get the user document from the database if the authenticated user changes and it is not anonymous.
  useEffect(() => {
    if (!authUser || authUser.isAnonymous) return () => {};

    // Must listen in-case result of sign up which will create new user doc.
    return listenDBDoc<UserDoc>('users', authUser.uid, (docData) => {
      setUser(new User(docData));
      setUserLoading(false);
    });
  }, [authUser]);

  useEffect(() => {
    // In DEV mode, check if the user document exists in the database.
    // Cached user auth data can get out of sync with firebase emulator that has had its data cleared.
    if (__DEV__ && authUser && !authUser.isAnonymous) {
      setTimeout(() => {
        getDBDoc<UserDoc>('users', authUser.uid)
          .then((docData) => { if (!docData) auth().signOut(); })
          .catch(() => auth().signOut());
      }, 3000); // Timeout to allow time for emulator to sync auth user to firestore via cloud functions on sign up.
    }
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

    if (predicateVal && getAuthUser()) {
      reloadAuthUser();

      intervalRef.current = setInterval(() => {
        predicateVal = resolvePredicate(predicate);

        (predicateVal && getAuthUser())
          ? reloadAuthUser()
          : clearInterval(intervalRef.current);
      }, intervalMs);
    }

    return () => clearInterval(intervalRef.current);
  }, [intervalMs, predicate]);

  return intervalRef;
}
