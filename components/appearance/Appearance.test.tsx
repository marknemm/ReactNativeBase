import { render } from '@testing-library/react-native';
import { AppProvider } from '@test/providers/app-provider/AppProvider';
import Appearance from './Appearance';

describe('<Appearance />', () => {
  it('renders correctly', () => {
    const tree = render(
      <Appearance appearance="auto" />,
      { wrapper: AppProvider }
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
