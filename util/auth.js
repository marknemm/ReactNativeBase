import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { log, logErr } from '@util/log';

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
    throw error;
  }

  try {
    await auth().currentUser.sendEmailVerification();
    log('Email verification sent');
  } catch (error) {
    logErr('Failed to send email verification:', error); // Do not throw error, should look successful to user.
  }

  return auth().currentUser;
}
