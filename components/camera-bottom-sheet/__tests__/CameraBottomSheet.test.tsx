import CameraBottomSheet from '@components/camera-bottom-sheet/CameraBottomSheet';
import AppProvider from '@test/contexts/app/AppProvider';
import { act, render, screen, userEvent } from '@testing-library/react-native';
import BottomSheet from '@components/bottom-sheet/BottomSheet';

jest.mock('@components/bottom-sheet/BottomSheet');

describe('<CameraBottomSheet />', () => {
  describe('callbacks', () => {
    it('Calls onClose when the close button is pressed', () => {
      const onClose = jest.fn();
      render(
        <CameraBottomSheet
          isVisible
          onClose={onClose}
        />,
        { wrapper: AppProvider }
      );

      act(() =>
        (BottomSheet as jest.Mock).mock.lastCall[0]?.onClose()
      );

      expect(onClose).toHaveBeenCalled();
    });

    it('Calls onPressTakePhoto when the take photo button is pressed', async () => {
      const onClose = jest.fn();
      const onPressTakePhoto = jest.fn();
      render(
        <CameraBottomSheet
          isVisible
          onClose={onClose}
          onPressTakePhoto={onPressTakePhoto}
        />,
        { wrapper: AppProvider }
      );

      const takePhotoButton = screen.getByRole('button', { name: 'Take Photo' });
      await userEvent.press(takePhotoButton);
      await jest.runAllTimersAsync();

      expect(onClose).toHaveBeenCalled();
      expect(onPressTakePhoto).toHaveBeenCalled();
    });

    it('Calls onPressChoosePhoto when the choose photo button is pressed', async () => {
      const onClose = jest.fn();
      const onPressChoosePhoto = jest.fn();
      render(
        <CameraBottomSheet
          isVisible
          onClose={onClose}
          onPressChoosePhoto={onPressChoosePhoto}
        />,
        { wrapper: AppProvider }
      );

      const takePhotoButton = screen.getByRole('button', { name: 'Choose Photo' });
      await userEvent.press(takePhotoButton);
      await jest.runAllTimersAsync();

      expect(onClose).toHaveBeenCalled();
      expect(onPressChoosePhoto).toHaveBeenCalled();
    });
  });

  describe('snapshots', () => {
    it('renders correctly when not visible', () => {
      const tree = render(
        <CameraBottomSheet />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when visible', () => {
      const tree = render(
        <CameraBottomSheet isVisible />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
