import ActivityIndicator from '@components/activity-indicator/ActivityIndicator';
import AppProvider from '@test/providers/app-provider/AppProvider';
import { render } from '@testing-library/react-native';

describe('<ActivityIndicator />', () => {
  describe('snapshots', () => {
    it('renders correctly', () => {
      const tree = render(
        <ActivityIndicator />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when not visible', () => {
      const tree = render(
        <ActivityIndicator isVisible={false} />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
