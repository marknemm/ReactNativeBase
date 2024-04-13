import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { CodedError } from '@util/coded-error';
import { log, logErr } from '@util/log';
import { Alert } from 'react-native';

GoogleSignin.configure();

/**
 * Performs a user login request.
 *
 * @param {string} email The user email address.
 * @param {string} password The user password.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in {@link FirebaseAuthTypes.User} when the login request is successful.
 * @throws {Error} An error is thrown when the login request fails.
 */
export async function login(email, password) {
  log('Logging in with email:', email, password);

  try {
    await auth().signInWithEmailAndPassword(email, password);
    log(`${email} logged in`);
  } catch (error) {
    log(`${email} failed to log in:`, error);
    throw new Error('Login failed: Invalid email or password');
  }

  return auth().currentUser;
}

/**
 * Performs an anonymous login request.
 *
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in anonymous {@link FirebaseAuthTypes.User} when the login request is successful.
 * @throws {Error} An error is thrown when the anonymous login request unexpectedly fails.
 */
export async function loginAnonymously() {
  log('Logging in anonymously');

  try {
    await auth().signInAnonymously();
    log('Logged in anonymously');
  } catch (error) {
    log('Anonymous login failed:', error);
    throw new Error('Something went wrong, try again...');
  }

  return auth().currentUser;
}

/**
 * Performs a Google login request.
 *
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in {@link FirebaseAuthTypes.User} when the login request is successful.
 */
export async function loginWithGoogle() {
  log('Logging in with Google');

  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken, user: { email } } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const signInMethods = await auth().fetchSignInMethodsForEmail(email);
    if (signInMethods.length && !signInMethods.includes(auth.GoogleAuthProvider.PROVIDER_ID)) {
      await attemptLinkAccounts(email, googleCredential);
    } else {
      await auth().signInWithCredential(googleCredential);
    }
  } catch (error) {
    log('Google login failed:', error);

    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:           throw new Error('');
      case statusCodes.IN_PROGRESS:                 throw new Error('Google sign in already in progress');
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: throw new Error('Google sign in is not available');
      case 'auth/link-failed':                      throw new Error('Failed to link accounts, please try again');
      default:
        throw new Error('Google sign in unexpectedly failed, please try again');
    }
  }

  return auth().currentUser;
}

/**
 * Performs a user logout request.
 *
 * @returns {Promise<void>} A promise that resolves when the logout request is complete.
 */
export async function logout() {
  log('Logging out');

  try {
    await auth().signOut();
    log('Logged out');
  } catch (error) {
    logErr('Failed to log out:', error);
  }
}

/**
 * Performs a user password reset request.
 *
 * @param {string} email The user email address.
 * @returns {Promise<void>} A promise that resolves when the password reset request is complete.
 */
export async function resetPassword(email) {
  log('Resetting password for email:', email);

  try {
    await auth().sendPasswordResetEmail(email);
    log('Password reset email sent');
  } catch (error) {
    log('Failed to reset password:', error);
    throw new Error('Failed to send password reset email, please double check your email and try again');
  }
}

/**
 * Performs a user signup request.
 *
 * @param {Object} param0 The signup parameters.
 * @param {string} param0.email The user email address.
 * @param {string} param0.password The user password.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the signed up {@link FirebaseAuthTypes.User} when the signup request is successful.
 * @throws {Error} An error is thrown when the signup request fails.
 */
export async function signup({ email, password }) {
  log('Signing up with email:', email);

  try {
    await auth().createUserWithEmailAndPassword(email, password);
    log(`${email} signed up`);
  } catch (error) {
    log(`${email} failed to sign up:`, error);

    switch (error.code) {
      case 'auth/email-already-in-use':
        return attemptLinkAccounts(email, auth.EmailAuthProvider.credential(email, password));
      case 'auth/invalid-email':  throw new Error('Invalid email address');
      case 'auth/weak-password':  throw new Error('Password is too weak, please enter a stronger password');
      default:                    throw new Error('Signup failed, please try again');
    }
  }

  if (!auth().currentUser.emailVerified) { // Check if email verification is required, may have linked to existing Oauth account.
    try {
      await auth().currentUser.sendEmailVerification();
      log('Email verification sent');
    } catch (error) {
      logErr('Failed to send email verification:', error); // Do not throw error, should look successful to user.
    }
  }

  return auth().currentUser;
}

/**
 * Attempts to link an existing account with the provided auth credential based on a common email.
 *
 * @param {string} email The email address of the accounts.
 * @param {FirebaseAuthTypes.AuthCredential} authCredential The auth credential to link with the existing account.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the linked {@link FirebaseAuthTypes.User} when the accounts are successfully linked.
 */
async function attemptLinkAccounts(email, authCredential) {
  log('Attempting to link accounts');

  const signInMethods = await auth().fetchSignInMethodsForEmail(email);
  if (signInMethods.includes(authCredential.providerId)) {
    throw new CodedError('Account already exists, please login instead', { code: 'auth/provider-already-linked' });
  }

  try {
    await loginWithProvider(signInMethods[0], email);
  } catch (error) {
    logErr('Failed to login with existing account:', error);
    throw new CodedError('Failed to link accounts, please try again', { code: 'auth/link-failed' });
  }

  try {
    if (authCredential.providerId === auth.EmailAuthProvider.PROVIDER_ID) {
      // Linking new email/password account to 3rd party oauth account requires updatePassword.
      await auth().currentUser.updatePassword(authCredential.secret);
    } else {
      // Linking 3rd party oauth account to another 3rd party oauth account or email/password account requires linkWithCredential.
      await auth().currentUser.linkWithCredential(authCredential);
    }
    log('Accounts linked');
  } catch (error) {
    logErr('Failed to link accounts:', error);
    throw new CodedError('Failed to link accounts, please try again', { code: 'auth/link-failed' });
  }

  return auth().currentUser;
}

/**
 * Prompts the user to login with a specific login provider.
 *
 * @param {string} providerId The login provider ID (e.g. {@link auth.EmailAuthProvider.PROVIDER_ID}).
 * @param {string} email The email address of the login account.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in {@link FirebaseAuthTypes.User} when the login request is successful.
 */
async function loginWithProvider(providerId, email) {
  switch (providerId) {
    case auth.EmailAuthProvider.PROVIDER_ID:
      return login(email, await promptForPassword(email));
    case auth.GoogleAuthProvider.PROVIDER_ID:
      return loginWithGoogle();
    default:
      throw new Error('Unknown login provider');
  }
}

/**
 * Prompts the user to enter their password.
 *
 * @param {string} email The email address of the account.
 * @returns {Promise<string>} A promise that resolves to the user's password when they acknowledge the prompt.
 */
async function promptForPassword(email) {
  return new Promise((resolve) => {
    Alert.prompt(
      'Link to Existing Account',
      `Please enter your password for your existing account:\n\n${email}`,
      [{ text: 'OK', onPress: resolve }],
      'secure-text',
      '',
      'password',
      { cancelable: false }
    );
  });
}
