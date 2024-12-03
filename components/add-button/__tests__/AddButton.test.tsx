import AddButton from '@components/add-button/AddButton';
import AppProvider from '@test/contexts/app/AppProvider';
import { userEvent, render, screen } from '@testing-library/react-native';

describe('<AddButton />', () => {
  describe('button press', () => {
    it('calls onPress when the button is pressed', async () => {
      const onPress = jest.fn();
      render(
        <AddButton onPress={onPress} />,
        { wrapper: AppProvider }
      );

      const addButton = screen.getByRole('button', { name: 'Add' });
      await userEvent.press(addButton);

      expect(onPress).toHaveBeenCalled();
    });

    it('does not call onPress when disabled', async () => {
      const onPress = jest.fn();
      render(
        <AddButton onPress={onPress} disabled />,
        { wrapper: AppProvider }
      );

      const addButton = screen.getByRole('button', { name: 'Add' });
      await userEvent.press(addButton);

      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <AddButton />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when disabled', () => {
      render(
        <AddButton disabled />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
