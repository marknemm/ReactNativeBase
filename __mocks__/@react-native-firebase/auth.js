const AuthMock = jest.fn().mockImplementation(() => ({
  firebase: {
    auth: () => ({
      signInWithCredential: jest.fn(),
      signOut: jest.fn(),
    }),
  },
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
}));

export default AuthMock;
