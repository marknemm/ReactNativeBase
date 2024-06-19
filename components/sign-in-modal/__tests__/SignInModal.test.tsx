import SignInModal from '@components/sign-in-modal/SignInModal';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';

describe('<SignInModal />', () => {
  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <SignInModal />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
