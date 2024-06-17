import EmailInput from '@components/email-input/EmailInput';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';

describe('<EmailInput />', () => {
  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <EmailInput />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
