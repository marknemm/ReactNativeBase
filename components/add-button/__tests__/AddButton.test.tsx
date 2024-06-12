import AddButton from '@components/add-button/AddButton';
import AppProvider from '@test/contexts/app/AppProvider';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('<AddButton />', () => {
  it('calls onPress when the button is pressed', () => {
    const onPress = jest.fn();
    render(
      <AddButton onPress={onPress} />,
      { wrapper: AppProvider }
    );

    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <AddButton onPress={onPress} disabled />,
      { wrapper: AppProvider }
    );

    fireEvent.press(screen.getByRole('button'));
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
