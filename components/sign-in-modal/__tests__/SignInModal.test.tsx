import SignInModal from '@components/sign-in-modal/SignInModal';
import AppProvider from '@test/contexts/app/AppProvider';
import { act, render, screen } from '@testing-library/react-native';
import SignInScreen from '@screens/sign-in/SignInScreen';
import ForgotPasswordScreen from '@screens/forgot-password/ForgotPasswordScreen';

jest.mock('@screens/sign-in/SignInScreen');
jest.mock('@screens/forgot-password/ForgotPasswordScreen');

describe('<SignInModal />', () => {
  const prompt = 'Test sign in modal';

  describe('display props', () => {
    it('renders with prompt', () => {
      render(
        <SignInModal prompt={prompt} />,
        { wrapper: AppProvider }
      );

      const promptText = screen.getByText(prompt);
      expect(promptText).toBeVisible();
    });
  });

  describe('callback props', () => {
    it('calls onClose when sign in is successful', () => {
      const onClose = jest.fn();
      const mockFirebaseAuthUser = {};
      render(
        <SignInModal onClose={onClose} />,
        { wrapper: AppProvider }
      );

      act(() =>
        (SignInScreen as jest.Mock).mock.calls[0][0].onSignIn(mockFirebaseAuthUser)
      );

      expect(onClose).toHaveBeenCalledWith(mockFirebaseAuthUser);
    });
  });

  describe('switching between sign in and forgot password', () => {
    it('renders sign in screen by default', () => {
      render(
        <SignInModal />,
        { wrapper: AppProvider }
      );

      expect(SignInScreen).toHaveBeenCalledWith(expect.objectContaining({
        isModal: true,
      }), expect.anything());
      expect(ForgotPasswordScreen).not.toHaveBeenCalled();
    });

    it('renders forgot password screen when onForgotPassword callback is triggered', () => {
      render(
        <SignInModal />,
        { wrapper: AppProvider }
      );

      expect(SignInScreen).toHaveBeenCalledWith(expect.objectContaining({
        isModal: true,
      }), expect.anything());
      expect(ForgotPasswordScreen).not.toHaveBeenCalled();

      act(() =>
        (SignInScreen as jest.Mock).mock.calls[0][0].onForgotPassword()
      );

      expect(ForgotPasswordScreen).toHaveBeenCalledWith(expect.objectContaining({
        isModal: true,
      }), expect.anything());
    });

    it('renders sign in screen when onSignIn callback is triggered', () => {
      render(
        <SignInModal />,
        { wrapper: AppProvider }
      );

      expect(SignInScreen).toHaveBeenCalledWith(expect.objectContaining({
        isModal: true,
      }), expect.anything());

      act(() =>
        (SignInScreen as jest.Mock).mock.calls[0][0].onForgotPassword()
      );

      expect(ForgotPasswordScreen).toHaveBeenCalledWith(expect.objectContaining({
        isModal: true,
      }), expect.anything());

      (SignInScreen as jest.Mock).mockClear();

      act(() =>
        (ForgotPasswordScreen as jest.Mock).mock.calls[0][0].onSignIn()
      );

      expect(SignInScreen).toHaveBeenCalledWith(expect.objectContaining({
        isModal: true,
      }), expect.anything());
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <SignInModal />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with prompt', () => {
      render(
        <SignInModal prompt={prompt} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
