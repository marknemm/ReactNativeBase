import BottomSheet from '@components/bottom-sheet/BottomSheet';
import { Text } from '@rneui/themed';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';

jest.mock('@hooks/modal-hooks');

describe('<BottomSheet />', () => {
  describe('inputs', () => {
    it('Renders the title', () => {
      const title = 'Test Title';
      render(
        <BottomSheet
          isVisible
          title={title}
        />,
        { wrapper: AppProvider }
      );

      expect(screen.getByText('Test Title')).toBeDefined();
    });

    it('Renders the children', () => {
      const childrenText = 'Test children';
      render(
        <BottomSheet isVisible>
          <Text>{ childrenText }</Text>
        </BottomSheet>,
        { wrapper: AppProvider }
      );

      expect(screen.getByText(childrenText)).toBeDefined();
    });
  });

  describe('callbacks', () => {
    it('Calls onClose when the close button is pressed', async () => {
      const onBackdropPress = jest.fn();
      const onClose = jest.fn();
      render(
        <BottomSheet
          isVisible
          onBackdropPress={onBackdropPress}
          onClose={onClose}
        />,
        { wrapper: AppProvider }
      );

      const closeButton = screen.getByRole('button', { name: 'Close' });
      await userEvent.press(closeButton);

      expect(onBackdropPress).not.toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });

    it('Calls onBackdropPress and onClose when backdrop is pressed', async () => {
      const onBackdropPress = jest.fn();
      const onClose = jest.fn();
      render(
        <BottomSheet
          isVisible
          onBackdropPress={onBackdropPress}
          onClose={onClose}
        />,
        { wrapper: AppProvider }
      );

      const backdrop = screen.getByTestId('RNE__Overlay__backdrop');
      await userEvent.press(backdrop);

      expect(onBackdropPress).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('snapshots', () => {
    it('renders correctly when not visible', () => {
      render(
        <BottomSheet />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when visible', () => {
      render(
        <BottomSheet isVisible />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
