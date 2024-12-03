import type { SignInScreenProps } from '@screens/sign-in/SignInScreen';

const MockSignInScreen = jest.fn().mockImplementation((props: SignInScreenProps) => {
  const ActualComponent = jest.requireActual('@screens/sign-in/SignInScreen').default;
  return <ActualComponent {...props} />;
});

export default MockSignInScreen;
