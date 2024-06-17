import ActivityIndicator from '@components/activity-indicator/ActivityIndicator';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';

describe('<ActivityIndicator />', () => {
  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <ActivityIndicator />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when not visible', () => {
      render(
        <ActivityIndicator isVisible={false} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
