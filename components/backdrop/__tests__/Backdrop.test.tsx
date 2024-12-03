import Backdrop from '@components/backdrop/Backdrop';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';

describe('<Backdrop />', () => {
  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <Backdrop />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when not visible', () => {
      render(
        <Backdrop isVisible={false} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
