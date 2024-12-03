import Input from '@components/input/Input';
import PasswordInput from '@components/password-input/PasswordInput';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';

jest.mock('@components/input/Input');

describe('<PasswordInput />', () => {
  describe('password field type', () => {
    it('should derive default password field type', () => {
      render(
        <PasswordInput />,
        { wrapper: AppProvider }
      );

      expect(Input).toHaveBeenCalledWith(expect.objectContaining({
        autoComplete: 'new-password',
        textContentType: 'newPassword',
      }), expect.any(Object));
    });

    it('should derive password textContentType from autoComplete', () => {
      render(
        <PasswordInput autoComplete="current-password" />,
        { wrapper: AppProvider }
      );

      expect(Input).toHaveBeenCalledWith(expect.objectContaining({
        autoComplete: 'current-password',
        textContentType: 'password',
      }), expect.any(Object));
    });

    it('should derive password autoComplete from textContentType', () => {
      render(
        <PasswordInput textContentType="password" />,
        { wrapper: AppProvider }
      );

      expect(Input).toHaveBeenCalledWith(expect.objectContaining({
        autoComplete: 'current-password',
        textContentType: 'password',
      }), expect.any(Object));
    });
  });

  describe('password visibility', () => {
    it('should not show password by default', () => {
      render(
        <PasswordInput />,
        { wrapper: AppProvider }
      );

      expect(Input).toHaveBeenCalledWith(expect.objectContaining({
        rightIcon: expect.objectContaining({
          color: 'gray',
          name: 'eye-off',
        }),
        secureTextEntry: true,
      }), expect.any(Object));
    });

    it('should show password if visibility toggle is enabled', async () => {
      render(
        <PasswordInput />,
        { wrapper: AppProvider }
      );

      const visibilityToggle = screen.getByRole('button', { name: 'Toggle password visibility' });
      await userEvent.press(visibilityToggle);

      expect(Input).toHaveBeenCalledWith(expect.objectContaining({
        rightIcon: expect.objectContaining({
          color: 'green',
          name: 'eye',
        }),
        secureTextEntry: false,
      }), expect.any(Object));
    });

    it('should not show password visibility toggle if not enabled', () => {
      render(
        <PasswordInput isVisibilityToggleEnabled={false} />,
        { wrapper: AppProvider }
      );

      const visibilityToggle = screen.queryByRole('button', { name: 'Toggle password visibility' });
      expect(visibilityToggle).toBeFalsy();
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <PasswordInput />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
