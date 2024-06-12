import Backdrop from '@components/backdrop/Backdrop';
import AppProvider from '@test/contexts/app/AppProvider';
import { render } from '@testing-library/react-native';

describe('<Backdrop />', () => {
  describe('snapshots', () => {
    it('renders correctly', () => {
      const tree = render(
        <Backdrop />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when not visible', () => {
      const tree = render(
        <Backdrop isVisible={false} />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
