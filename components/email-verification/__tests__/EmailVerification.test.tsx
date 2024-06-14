import EmailVerification from '@components/email-verification/EmailVerification';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen, userEvent } from '@testing-library/react-native';
import { getMockAuthUser } from '@util/__mocks__/user';
import User from '@util/user';

describe('<EmailVerification />', () => {
  let mockUser: User;

  beforeEach(() => {
    mockUser = getMockAuthUser();
    jest.spyOn(mockUser, 'emailVerified', 'get').mockReturnValue(true);
  });

  describe('verification status display', () => {
    it('displays nothing when verified and not configured to be visible when verified', () => {
      render(
        <EmailVerification user={mockUser} />,
        { wrapper: AppProvider }
      );

      const verifiedText = screen.queryByRole('text');
      expect(verifiedText).toBeFalsy();
    });

    it('displays verified text when configured to be visible when verified', () => {
      render(
        <EmailVerification
          isVisibleWhenVerified
          user={mockUser}
        />,
        { wrapper: AppProvider }
      );

      const verifiedText = screen.getByText(/Email Verified/i);
      expect(verifiedText).toBeTruthy();
    });

    it('displays unverified text when unverified', () => {
      jest.spyOn(mockUser, 'emailVerified', 'get').mockReturnValue(false);

      render(
        <EmailVerification user={mockUser} />,
        { wrapper: AppProvider }
      );

      const notVerifiedText = screen.getByText(/Email Not Verified/i);
      expect(notVerifiedText).toBeTruthy();
    });

    it('displays resend email button when unverified', () => {
      jest.spyOn(mockUser, 'emailVerified', 'get').mockReturnValue(false);

      render(
        <EmailVerification user={mockUser} />,
        { wrapper: AppProvider }
      );

      const resendEmailButton = screen.getByRole('button', { name: /Resend Email/i });
      expect(resendEmailButton).toBeTruthy();
    });
  });

  describe('resend email button', () => {
    it('sends email verification when resend email button is pressed', async () => {
      jest.spyOn(mockUser, 'emailVerified', 'get').mockReturnValue(false);

      render(
        <EmailVerification user={mockUser} />,
        { wrapper: AppProvider }
      );

      const resendEmailButton = screen.getByRole('button', { name: /Resend Email/i });
      await userEvent.press(resendEmailButton);

      expect(mockUser.sendEmailVerification).toHaveBeenCalledTimes(1);
    });

    it('displays success message when email verification is sent', async () => {
      jest.spyOn(mockUser, 'emailVerified', 'get').mockReturnValue(false);

      render(
        <EmailVerification user={mockUser} />,
        { wrapper: AppProvider }
      );

      const resendEmailButton = screen.getByRole('button', { name: /Resend Email/i });
      await userEvent.press(resendEmailButton);

      const successMessage = await screen.findByText(/Success - please check your email/i);
      expect(successMessage).toBeTruthy();
    });
  });

  describe('snapshots', () => {
    it('renders correctly when not visible', () => {
      const tree = render(
        <EmailVerification user={mockUser} />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when verified and visible', () => {
      const tree = render(
        <EmailVerification
          isVisibleWhenVerified
          user={mockUser}
        />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when not verified', () => {
      jest.spyOn(mockUser, 'emailVerified', 'get').mockReturnValue(false);

      const tree = render(
        <EmailVerification user={mockUser} />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
