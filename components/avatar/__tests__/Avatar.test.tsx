import Avatar from '@components/avatar/Avatar';
import CameraBottomSheet from '@components/camera-bottom-sheet/CameraBottomSheet';
import Form from '@components/form/Form';
import AppProvider from '@test/contexts/app/AppProvider';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react-native';
import { launchCamera, launchMediaLibrary } from '@util/camera';
import { useForm } from 'react-hook-form';

jest.mock('@components/camera-bottom-sheet/CameraBottomSheet');
jest.mock('@util/camera');

describe('<Avatar />', () => {
  describe('bottom sheet visibility', () => {
    it('Does not open the bottom sheet when not editable and pressed', () => {
      render(
        <Avatar />,
        { wrapper: AppProvider }
      );

      fireEvent.press(screen.getByTestId('RNE__Avatar__Image'));
      expect(screen.queryByText('Edit Photo')).toBeFalsy();
    });

    it('opens the bottom sheet when editable and pressed', () => {
      render(
        <Avatar editable />,
        { wrapper: AppProvider }
      );

      fireEvent.press(screen.getByTestId('RNE__Avatar__Image'));
      expect(screen.getByText('Edit Photo')).toBeTruthy();
    });

    it('opens the bottom sheet with custom description when editable and pressed', () => {
      const description = 'Test Photo';
      render(
        <Avatar
          description={description}
          editable
        />,
        { wrapper: AppProvider }
      );

      fireEvent.press(screen.getByTestId('RNE__Avatar__Image'));
      expect(screen.getByText(`Edit ${description}`)).toBeTruthy();
    });

    it('closes the bottom sheet when dismissed', () => {
      render(
        <Avatar editable />,
        { wrapper: AppProvider }
      );

      fireEvent.press(screen.getByTestId('RNE__Avatar__Image'));
      act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onClose()
      );
      expect(screen.queryByText('Edit Photo')).toBeFalsy();
    });
  });

  describe('value changes', () => {
    it('calls the `onChange` callback when an image is selected', async () => {
      const onChange = jest.fn();
      render(
        <Avatar
          editable
          onChange={onChange}
        />,
        { wrapper: AppProvider }
      );

      await act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onPressChoosePhoto()
      );

      expect(onChange).toHaveBeenCalledWith('media.jpg');
    });

    it('calls does not call `onChange` callback when image selection is cancelled', async () => {
      (launchMediaLibrary as jest.Mock).mockResolvedValueOnce([]);
      const onChange = jest.fn();
      render(
        <Avatar
          editable
          onChange={onChange}
        />,
        { wrapper: AppProvider }
      );

      await act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onPressChoosePhoto()
      );

      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls the `onChange` callback when a photo is taken', async () => {
      const onChange = jest.fn();
      render(
        <Avatar
          editable
          onChange={onChange}
        />,
        { wrapper: AppProvider }
      );

      await act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onPressTakePhoto()
      );

      expect(onChange).toHaveBeenCalledWith('camera.jpg');
    });

    it('calls does not call `onChange` callback when camera is cancelled', async () => {
      (launchCamera as jest.Mock).mockResolvedValueOnce([]);
      const onChange = jest.fn();
      render(
        <Avatar
          editable
          onChange={onChange}
        />,
        { wrapper: AppProvider }
      );

      await act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onPressTakePhoto()
      );

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('form control', () => {
    it('Updates the form value and calls the `onChange` callback when an image is selected', async () => {
      const form = renderHook(() => useForm({
        defaultValues: { avatar: '' },
      })).result.current;
      const onChange = jest.fn();

      render(
        <Form form={form}>
          <Avatar
            editable
            name="avatar"
            onChange={onChange}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      await act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onPressChoosePhoto()
      );

      expect(form.getValues('avatar')).toBe('media.jpg');
      expect(onChange).toHaveBeenCalledWith('media.jpg');
    });

    it('calls does not update form value or call `onChange` callback when image selection is cancelled', async () => {
      (launchMediaLibrary as jest.Mock).mockResolvedValueOnce([]);
      const form = renderHook(() => useForm({
        defaultValues: { avatar: '' },
      })).result.current;
      const onChange = jest.fn();

      render(
        <Form form={form}>
          <Avatar
            editable
            name="avatar"
            onChange={onChange}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      await act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onPressChoosePhoto()
      );

      expect(form.getValues('avatar')).toBe('');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('Updates the form value and calls the `onChange` callback when a photo is taken', async () => {
      const form = renderHook(() => useForm({
        defaultValues: { avatar: '' },
      })).result.current;
      const onChange = jest.fn();

      render(
        <Form form={form}>
          <Avatar
            editable
            name="avatar"
            onChange={onChange}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      await act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onPressTakePhoto()
      );

      expect(form.getValues('avatar')).toBe('camera.jpg');
      expect(onChange).toHaveBeenCalledWith('camera.jpg');
    });

    it('calls does not update form value or call `onChange` callback when camera is cancelled', async () => {
      (launchCamera as jest.Mock).mockResolvedValueOnce([]);
      const form = renderHook(() => useForm({
        defaultValues: { avatar: '' },
      })).result.current;
      const onChange = jest.fn();

      render(
        <Form form={form}>
          <Avatar
            editable
            name="avatar"
            onChange={onChange}
          />
        </Form>,
        { wrapper: AppProvider }
      );

      await act(() =>
        (CameraBottomSheet as jest.Mock).mock.lastCall[0]?.onPressTakePhoto()
      );

      expect(form.getValues('avatar')).toBe('');
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <Avatar />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when editable', () => {
      render(
        <Avatar editable />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when editable and pressed', () => {
      render(
        <Avatar editable />,
        { wrapper: AppProvider }
      );

      fireEvent.press(screen.getByTestId('RNE__Avatar__Image'));
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
