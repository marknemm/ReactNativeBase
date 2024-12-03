import StatusDot from '@components/status-dot/StatusDot';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';

describe('<StatusDot />', () => {
  describe('styles', () => {
    it('renders with default styles', () => {
      render(
        <StatusDot />,
        { wrapper: AppProvider }
      );

      const statusDotView = screen.getByTestId('rnb-status-dot');

      expect(statusDotView).toHaveStyle({
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'gray',
      });
    });

    it('renders with custom styles', () => {
      render(
        <StatusDot
          color="green"
          size={20}
          style={{ marginLeft: 10 }}
        />,
        { wrapper: AppProvider }
      );

      const statusDotView = screen.getByTestId('rnb-status-dot');

      expect(statusDotView).toHaveStyle({
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        marginLeft: 10,
      });
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <StatusDot />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
