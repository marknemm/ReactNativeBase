import { AppProvider } from '@test/providers/app-provider/AppProvider';
import { fireEvent, render } from '@testing-library/react-native';
import AddButton from './AddButton';

describe('<AddButton />', () => {
  it('calls onPress when the button is pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <AddButton onPress={onPress} />,
      { wrapper: AppProvider }
    );

    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <AddButton onPress={onPress} disabled />,
      { wrapper: AppProvider }
    );

    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      const tree = render(
        <AddButton />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when disabled', () => {
      const tree = render(
        <AddButton disabled />,
        { wrapper: AppProvider }
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
