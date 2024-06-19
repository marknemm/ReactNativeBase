import type { ForgotPasswordScreenProps } from '@screens/forgot-password/ForgotPasswordScreen';

const MockForgotPasswordScreen = jest.fn().mockImplementation((props: ForgotPasswordScreenProps) => {
  const ActualComponent = jest.requireActual('@screens/forgot-password/ForgotPasswordScreen').default;
  return <ActualComponent {...props} />;
});

export default MockForgotPasswordScreen;
