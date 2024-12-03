import { UserContext } from '@contexts/user/UserContext';
import UserProvider from '@contexts/user/UserProvider';
import { renderHook } from '@testing-library/react-native';
import { genMockUser } from '@util/__mocks__/user';
import { useContext } from 'react';

jest.mock('@util/user');

describe('<UserProvider />', () => {
  describe('Provide', () => {
    it('Provides User', () => {
      const user = genMockUser();

      const providedUser = renderHook(
        () => useContext(UserContext),
        {
          wrapper: ({ children }) => (
            <UserProvider user={user}>
              { children }
            </UserProvider>
          ),
        }
      ).result.current;

      expect(providedUser).toBe(user);
    });
  });
});
