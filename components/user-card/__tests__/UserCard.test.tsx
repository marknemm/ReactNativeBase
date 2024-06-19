import UserCard from '@components/user-card/UserCard';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';
import { genMockUser } from '@util/__mocks__/user';
import type User from '@util/user';

describe('<UserCard />', () => {
  let mockUser: User;

  beforeEach(() => {
    mockUser = genMockUser();
  });

  describe('snapshots', () => {
    it('renders correctly when not given a user', () => {
      render(
        <UserCard user={null} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when given a user', () => {
      render(
        <UserCard user={mockUser} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
