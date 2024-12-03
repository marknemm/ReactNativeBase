import { useAuthRefresh, useAuthState } from '@hooks/auth-hooks';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { act, renderHook } from '@testing-library/react-native';
import { genMockAuthUser } from '@util/__mocks__/auth';
import { genMockUser } from '@util/__mocks__/user';
import { getAuthUser, onAuthUserChanged, reloadAuthUser, signOut } from '@util/auth';
import type User from '@util/user';
import { listenUser, loadUser } from '@util/user';

jest.mock('@util/auth');
jest.mock('@util/user');

describe('auth-hooks', () => {
  let mockAuthUser: FirebaseAuthTypes.User,
    mockUser: User,
    fireAuthUserChanged: (user: FirebaseAuthTypes.User) => void;

  beforeEach(() => {
    mockAuthUser = genMockAuthUser();
    (getAuthUser as jest.Mock).mockReturnValue(mockAuthUser);
    (onAuthUserChanged as jest.Mock).mockImplementation((listener) => {
      fireAuthUserChanged = listener;
      listener(mockAuthUser);
      return () => {};
    });

    mockUser = genMockUser(mockAuthUser.uid.charCodeAt(mockAuthUser.uid.length - 1) - 48);
    (loadUser as jest.Mock).mockResolvedValue(mockUser);
    (listenUser as jest.Mock).mockImplementation((id, onSuccess) => {
      if (id === mockAuthUser.uid) { onSuccess(mockUser); }
      return () => {};
    });
  });

  describe('useAuthRefresh', () => {
    it('should reload auth user', () => {
      renderHook(
        () => useAuthRefresh() // defaults to true
      );

      expect(reloadAuthUser).toHaveBeenCalledTimes(1);
    });

    it('should not reload auth user', () => {
      renderHook(
        () => useAuthRefresh(false)
      );

      expect(reloadAuthUser).not.toHaveBeenCalled();
    });

    it('should reload auth user at a default interval', () => {
      renderHook(
        () => useAuthRefresh()
      );

      jest.advanceTimersByTime(3000);

      expect(reloadAuthUser).toHaveBeenCalledTimes(2);
    });

    it('should reload auth user at a custom interval', () => {
      renderHook(
        () => useAuthRefresh(true, 5000)
      );

      jest.advanceTimersByTime(10000);

      expect(reloadAuthUser).toHaveBeenCalledTimes(3);
    });

    it('should not reload auth user after predicate changes to false', () => {
      const predicate = jest.fn().mockReturnValue(true);
      renderHook(
        () => useAuthRefresh(predicate)
      );

      jest.advanceTimersByTime(3000);

      expect(reloadAuthUser).toHaveBeenCalledTimes(2);

      predicate.mockReturnValue(false);
      jest.advanceTimersByTime(3000);

      expect(reloadAuthUser).toHaveBeenCalledTimes(2);
    });

    it('should not reload auth user after clearing returned interval', () => {
      const intervalRef = renderHook(
        () => useAuthRefresh()
      ).result.current;

      jest.advanceTimersByTime(3000);

      expect(reloadAuthUser).toHaveBeenCalledTimes(2);

      clearInterval(intervalRef.current);
      jest.advanceTimersByTime(3000);

      expect(reloadAuthUser).toHaveBeenCalledTimes(2);
    });

    describe('useAuthState', () => {
      it('should listen for auth user', () => {
        (getAuthUser as jest.Mock).mockReturnValueOnce(null);
        (onAuthUserChanged as jest.Mock).mockReturnValueOnce(() => {});
        const { authUser, user, userLoading } = renderHook(
          () => useAuthState()
        ).result.current;

        expect(authUser).toBeFalsy();
        expect(user).toBeFalsy();
        expect(userLoading).toBeTruthy();
        expect(onAuthUserChanged).toHaveBeenCalledTimes(1);
        expect(listenUser).not.toHaveBeenCalled();
      });

      it('should initially set auth user', () => {
        (onAuthUserChanged as jest.Mock).mockReturnValueOnce(() => {});
        (listenUser as jest.Mock).mockReturnValueOnce(() => {});
        const { authUser, user, userLoading } = renderHook(
          () => useAuthState()
        ).result.current;

        expect(authUser).toBe(mockAuthUser);
        expect(user).toBeFalsy();
        expect(userLoading).toBeTruthy();
        expect(onAuthUserChanged).toHaveBeenCalledTimes(1);
        expect(listenUser).toHaveBeenCalledTimes(1);
      });

      it('should set auth user on listener fire', () => {
        (getAuthUser as jest.Mock).mockReturnValueOnce(null);
        (listenUser as jest.Mock).mockReturnValueOnce(() => {});
        const { authUser, user, userLoading } = renderHook(
          () => useAuthState()
        ).result.current;

        expect(authUser).toBe(mockAuthUser);
        expect(user).toBeFalsy();
        expect(userLoading).toBeTruthy();
        expect(onAuthUserChanged).toHaveBeenCalledTimes(1);
        expect(listenUser).toHaveBeenCalledTimes(1);
      });

      it('should set auth user and user to anonymous user', () => {
        mockAuthUser.isAnonymous = true;
        const { authUser, user, userLoading } = renderHook(
          () => useAuthState()
        ).result.current;

        expect(authUser).toBe(mockAuthUser);
        expect(user.isAnonymous).toEqual(true);
        expect(userLoading).toBeFalsy();
        expect(onAuthUserChanged).toHaveBeenCalledTimes(1);
        expect(listenUser).not.toHaveBeenCalled();
      });

      it('should set user on listener fire', () => {
        const { authUser, user, userLoading } = renderHook(
          () => useAuthState()
        ).result.current;

        expect(authUser).toBe(mockAuthUser);
        expect(user).toBe(mockUser);
        expect(userLoading).toBeFalsy();
      });

      it('should set auth user and user to null on auth listener fire with null', () => {
        const { result } = renderHook(
          () => useAuthState()
        );

        expect(result.current.authUser).toBe(mockAuthUser);
        expect(result.current.user).toBe(mockUser);
        expect(result.current.userLoading).toBeFalsy();

        act(() => fireAuthUserChanged(null)); // Normally caused by something like call to signOut().

        expect(result.current.authUser).toBe(null);
        expect(result.current.user).toBe(null);
        expect(result.current.userLoading).toBeFalsy();
      });

      it('should set auth user to new value and user to null on auth listener fire with new user', () => {
        const { result } = renderHook(
          () => useAuthState()
        );

        expect(result.current.authUser).toBe(mockAuthUser);
        expect(result.current.user).toBe(mockUser);
        expect(result.current.userLoading).toBeFalsy();

        const newMockAuthUser = genMockAuthUser(1);
        (listenUser as jest.Mock).mockReturnValueOnce(() => {}); // Simulate waiting for new user DB data.
        act(() => fireAuthUserChanged(newMockAuthUser)); // Simulate switching auth users.

        expect(result.current.authUser).toBe(newMockAuthUser);
        expect(result.current.user).toBe(null);
        expect(result.current.userLoading).toBeTruthy();
        expect(listenUser).toHaveBeenCalledTimes(2);
      });

      it('should not unset user if auth user listener fires with same updated auth user', () => {
        const { result } = renderHook(
          () => useAuthState()
        );

        expect(result.current.authUser).toBe(mockAuthUser);
        expect(result.current.user).toBe(mockUser);
        expect(result.current.userLoading).toBeFalsy();

        (listenUser as jest.Mock).mockReturnValueOnce(() => {}); // Simulate waiting for new user DB data.
        act(() => fireAuthUserChanged(genMockAuthUser())); // Simulate auth user listener firing with same updated user.

        expect(JSON.stringify(result.current.authUser))
          .toEqual(JSON.stringify(mockAuthUser));
        expect(JSON.stringify(result.current.user))
          .toEqual(JSON.stringify(mockUser));
        expect(result.current.userLoading).toBeTruthy();
        expect(listenUser).toHaveBeenCalledTimes(2);
      });

      describe('dev mode', () => {
        it('should reload user after timeout in dev mode', async () => {
          (__DEV__ as boolean) = true; // eslint-disable-line no-global-assign
          renderHook(
            () => useAuthState()
          );

          await jest.advanceTimersByTime(3000);

          expect(loadUser).toHaveBeenCalled();
          expect(signOut).not.toHaveBeenCalled();
        });

        it('should sign out if user doc does not exist after timeout in dev mode', async () => {
          (__DEV__ as boolean) = true; // eslint-disable-line no-global-assign
          renderHook(
            () => useAuthState()
          );

          (loadUser as jest.Mock).mockResolvedValueOnce(null);
          await jest.advanceTimersByTimeAsync(3000);

          expect(loadUser).toHaveBeenCalled();
          expect(signOut).toHaveBeenCalled();
        });

        it('should sign out if error is thrown after timeout in dev mode', async () => {
          (__DEV__ as boolean) = true; // eslint-disable-line no-global-assign
          renderHook(
            () => useAuthState()
          );

          (loadUser as jest.Mock).mockRejectedValue(new Error('Test Error'));
          await jest.advanceTimersByTimeAsync(3000);

          expect(loadUser).toHaveBeenCalled();
          expect(signOut).toHaveBeenCalled();
        });
      });
    });
  });
});
