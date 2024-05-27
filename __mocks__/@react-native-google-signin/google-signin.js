jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    signIn: jest.fn().mockImplementation(() => Promise.resolve({ idToken: '123' })),
  },
}));
