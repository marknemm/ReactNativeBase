import EmailInput from '@components/email-input/EmailInput';
import AppProvider from '@test/contexts/app/AppProvider';
import { render } from '@testing-library/react-native';

describe('<EmailInput />', () => {
  describe('snapshots', () => {
    it('renders correctly', () => {
      const tree = render(
        <EmailInput />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
