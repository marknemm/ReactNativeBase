import { AppProvider } from '@test/providers/app-provider/AppProvider';
import { render } from '@testing-library/react-native';
import AddButton from './AddButton';

describe('<AddButton />', () => {
  it('renders correctly', () => {
    const tree = render(
      <AddButton />,
      { wrapper: AppProvider }
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
