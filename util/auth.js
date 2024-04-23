import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { CodedError } from '@util/coded-error';
import { log, logErr, logThrowErr } from '@util/log';
import { AppleAuthenticationScope, signInAsync } from 'expo-apple-authentication';
import { Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { getFBEmail } from './facebook';
import { getLSItem } from './local-storage';

GoogleSignin.configure();

/**
 * Determines if a given sign-in provider is linked to the current {@link FirebaseAuthTypes.User user}.
 *
 * @param {string} providerId The sign in provider ID (e.g. {@link auth.EmailAuthProvider.PROVIDER_ID}).
 * @returns {boolean} `true` if the user has the specified sign-in provider, otherwise `false`.
 */
export function hasSignInProvider(providerId) {
  return auth().currentUser?.providerData.some(
    (provider) => provider.providerId === providerId
  ) ?? false;
}

/**
 * Reloads the current authenticated {@link FirebaseAuthTypes.User}.
 *
 * @returns {Promise<void>} A promise that resolves when the user is reloaded.
 */
export async function reloadAuthUser() {
  try {
    return auth().currentUser?.reload();
  } catch (error) {
    log('Error refreshing user:', error);
  }
  return Promise.resolve();
}

/**
 * Sends a password reset email.
 *
 * @param {string} email The user email address.
 * @returns {Promise<void>} A promise that resolves when the password reset email is sent.
 */
export async function sendPasswordResetEmail(email) {
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
 * Performs an anonymous sign in request.
 *
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the signed in anonymous {@link FirebaseAuthTypes.User} when the sign in request is successful.
 * @throws {Error} An error is thrown when the anonymous sign in request unexpectedly fails.
 */
export async function signInAnonymously() {
  if (auth().currentUser) return auth().currentUser; // Prevent sign in if already signed in

  log('Signing in anonymously');

  try {
    await auth().signInAnonymously();
    log('Signed in anonymously');
  } catch (error) {
    log('Anonymous sign in failed:', error);
    throw new Error('Something went wrong, try again...');
  }

  return auth().currentUser;
}

/**
 * Performs an Apple sign in request.
 *
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the signed in {@link FirebaseAuthTypes.User} when the sign in request is successful.
 */
export async function signInWithApple() {
  if (auth().currentUser) return auth().currentUser; // Prevent sign in if already signed in

  let authCredential, email;
  log('Signing in with Apple');

  try {
    // Present modal to sign into Apple account with email and full name permissions
    const appleCredential = await signInAsync({
      requestedScopes: [
        AppleAuthenticationScope.EMAIL,
        AppleAuthenticationScope.FULL_NAME,
      ],
    });

    // Create Apple credential with Apple identity token
    authCredential = auth.AppleAuthProvider.credential(appleCredential.identityToken);
    email = appleCredential.email; // Will be null if not first time signing in with Apple

    // Sign-in the user with the Apple auth credential
    await signInWithCredential(authCredential, email);
  } catch (error) {
    switch (error.code) {
      case 'ERR_REQUEST_CANCELLED': throw new Error(''); // User cancelled sign in, do not present visible error
      default:                      await handleAuthError(error, email, authCredential);
    }
  }

  return auth().currentUser;
}

/**
 * Performs a user sign in request.
 *
 * @param {string} email The user email address.
 * @param {string} [password] The user password. If not given, then prompts the user for a password via alert dialog.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the signed in {@link FirebaseAuthTypes.User} when the sign in request is successful.
 * @throws {Error} An error is thrown when the sign in request fails.
 */
export async function signInWithEmailAndPassword(email, password) {
  if (auth().currentUser) return auth().currentUser; // Prevent sign in if already signed in

  log('Signing in with email and password:', email);
  password ??= await promptForPassword(email);

  try {
    await auth().signInWithEmailAndPassword(email, password);
    log(`${email} signed in`);
  } catch (error) {
    await handleAuthError(error, email, auth.EmailAuthProvider.credential(email, password));
  }

  return auth().currentUser;
}

/**
 * Performs a Facebook sign in request.
 *
 * @param {Record<string, unknown>} [loginError] The error that occurred during the sign in request. Only expected with `loginResult`.
 * @param {import('react-native-fbsdk-next').LoginResult} [loginResult] The Facebook sign in result. If not given, will prompt user to sign in.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the signed in {@link FirebaseAuthTypes.User} when the sign in request is successful.
 */
export async function signInWithFacebook(loginError, loginResult) {
  if (auth().currentUser) return auth().currentUser; // Prevent multiple sign in attempts

  let authCredential, email;
  log('Signing in with Facebook');

  try {
    if (loginError) logThrowErr(loginError); // If external sign in button produced error, throw it

    // Present modal to sign into Facebook account with public profile and email permissions
    loginResult ??= await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (loginResult.isCancelled) {
      throw new CodedError('Sign in request cancelled', { code: 'ERR_REQUEST_CANCELLED' });
    }

    // Get Facebook access token upon successful sign in and create a Facebook credential with it
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    authCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    email = await getFBEmail(); // Have to use custom instead of Profile.getCurrentProfile() due to Android SDK limitations

    // Sign-in the user with the Facebook credential
    await signInWithCredential(authCredential, email);
  } catch (error) {
    LoginManager.logOut();
    switch (error.code) {
      case 'ERR_REQUEST_CANCELLED': throw new Error(''); // User cancelled sign in, do not present visible error
      default:                      await handleAuthError(error, email, authCredential);
    }
  }

  return auth().currentUser;
}

/**
 * Performs a Google sign in request.
 *
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the signed in {@link FirebaseAuthTypes.User} when the sign in request is successful.
 */
export async function signInWithGoogle() {
  if (auth().currentUser) return auth().currentUser; // Prevent sign in if already signed in

  let authCredential, email;
  log('Signing in with Google');

  try {
    // Show Play services update dialog on Android since must be up-to-date to show sign-in modal
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Present modal to sign into Gmail account and create Google credential with Gmail ID token
    const { idToken, user } = await GoogleSignin.signIn();
    authCredential = auth.GoogleAuthProvider.credential(idToken);
    email = user.email;

    await signInWithCredential(authCredential, email);
  } catch (error) {
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:           throw new Error(''); // User cancelled sign in, do not present visible error
      case statusCodes.IN_PROGRESS:                 throw new Error('Google sign in already in progress');
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: throw new Error('Google sign in is not available');
      default:                                      await handleAuthError(error, email, authCredential);
    }
  }

  return auth().currentUser;
}

/**
 * Performs a user sign in request with a phone number.
 *
 * @param {string} phoneNumber The user phone number.
 * @returns {Promise<FirebaseAuthTypes.ConfirmationResult>} A promise that resolves to the {@link FirebaseAuthTypes.ConfirmationResult}
 * when the confirmation code is texted to the given `phoneNumber`.
 */
export async function signInWithPhoneNumber(phoneNumber) {
  if (!auth().currentUser) return null; // Prevent sign in if already signed in

  log('Signing in with phone:', phoneNumber);

  try {
    return await auth().signInWithPhoneNumber(phoneNumber, true); // true - force message to resend if sent already
  } catch (error) {
    await handleAuthError(error, phoneNumber, auth.PhoneAuthProvider.credential(phoneNumber));
  }

  return null;
}

/**
 * Performs a user sign out request.
 *
 * @returns {Promise<void>} A promise that resolves when the sign out request is complete.
 */
export async function signOut() {
  if (!auth().currentUser) return; // Prevent sign out if not signed in

  log('Signing out');

  try {
    await auth().signOut();
    log('signed out');
  } catch (error) {
    logErr('Failed to sign out:', error);
  }
}

/**
 * Performs a user sign up request.
 *
 * @param {string} email The user email address.
 * @param {string} password The user password.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the signed up {@link FirebaseAuthTypes.User} when the sign up request is successful.
 * @throws {Error} An error is thrown when the sign up request fails.
 */
export async function signUp(email, password) {
  if (auth().currentUser) return auth().currentUser; // Prevent sign up if already signed in

  log('Signing up with email:', email);

  try {
    await auth().createUserWithEmailAndPassword(email, password);
    log(`${email} signed up`);
  } catch (error) {
    await handleAuthError(error, email, auth.EmailAuthProvider.credential(email, password), 'Signup');
  }

  if (!auth().currentUser.emailVerified) { // Check if email verification is required, may have linked to verified Oauth account (e.g. Gmail).
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
 * Updates the user password.
 *
 * @param {string} currentPassword The user's current password.
 * @param {string} newPassword The user's new password.
 * @returns {Promise<void>} A promise that resolves when the password update request is successful.
 * @throws {Error} An error is thrown when the password update request fails.
 */
export async function updatePassword(currentPassword, newPassword) {
  log('Updating password');

  try {
    const authCredential = auth.EmailAuthProvider.credential(auth().currentUser.email, currentPassword);
    await auth().currentUser.reauthenticateWithCredential(authCredential);
    await auth().currentUser.updatePassword(newPassword);
    log('Password updated');
  } catch (error) {
    log('Failed to update password:', error);
    if (!auth().currentUser) {
      throw new Error('Must be signed in to update password');
    }
    throw new Error('Failed to update password, please try again');
  }
}

// --- PRIVATE HELPER FUNCTIONS --- //

/**
 * Handles authentication credential sign in.
 * Handles case where account already exists with email/password by linking accounts.
 *
 * @param {FirebaseAuthTypes.AuthCredential} authCredential The auth credential used for sign in.
 * @param {string} [email] The email address of the account.
 * @returns {Promise<void>} A promise that resolves when the sign in request is successful.
 */
async function signInWithCredential(authCredential, email) {
  email ??= getLSItem(AUTH_SIGN_IN_LAST_EMAIL_KEY);
  const signInMethods = email
    ? await auth().fetchSignInMethodsForEmail(email)
    : [];

  // Check if account already exists with email - have to do before attempting sign in to prevent email/password account clobbering bug
  (authCredential.providerId !== auth.EmailAuthProvider.PROVIDER_ID
  && signInMethods.length === 1
  && signInMethods.includes(auth.EmailAuthProvider.PROVIDER_ID))
    // Account already registered with email, link current account with 3rd party Oauth account
    ? await linkWithCredential(authCredential, email)
    // Sign in with 3rd party credential and implicitly create account based on 3rd party Oauth data
    : await auth().signInWithCredential(authCredential);

  log('Signed in with:', authCredential.providerId);
}

/**
 * Handles an authentication error based on the error code.
 *
 * @param {CodedError} error The authentication {@link CodedError error}.
 * @param {string} email The email address of the account.
 * @param {FirebaseAuthTypes.AuthCredential} authCredential The auth credential used for the failed authentication.
 * @param {string} [authAction='Sign in'] The authentication action that failed (e.g. 'Sign in', 'Signup').
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that typically rejects with an error message based on the error code.
 * If the error code is equivalent to `auth/email-already-in-use`, if account link is successful, the promise resolves to the linked {@link FirebaseAuthTypes.User}.
 */
async function handleAuthError(error, email, authCredential, authAction = 'Sign in') {
  log(`(${authAction} - ${email}) auth error:`, error);

  switch (error.code) {
    case 'auth/email-already-in-use':    return linkWithCredential(authCredential, email);
    case 'auth/invalid-email':           throw new Error('Invalid email address');
    case 'auth/link-failed':             throw new Error('Failed to link accounts, please try again');
    case 'auth/provider-already-linked': throw new Error('Account already exists, please sign in instead');
    case 'auth/user-disabled':           throw new Error('Account is disabled, please contact support');
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    default:                             throw new Error(`${authAction} failed, please try again`);
  }
}

/**
 * Attempts to link an existing account with the provided auth credential based on a common email.
 *
 * @param {FirebaseAuthTypes.AuthCredential} authCredential The auth credential to link with the existing account.
 * @param {string} email The email address of the accounts.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the linked {@link FirebaseAuthTypes.User} when the accounts are successfully linked.
 */
async function linkWithCredential(authCredential, email) {
  log('Attempting to link accounts');

  // Get current account(s) / sign-in method(s) and check if account already exists
  const signInMethods = await auth().fetchSignInMethodsForEmail(email);
  if (signInMethods.includes(authCredential.providerId)) {
    throw new CodedError('Account already exists, please sign in instead', { code: 'auth/provider-already-linked' });
  }

  // Sign in with the first available provider of existing account to link with new account
  try {
    await signInWithProvider(signInMethods[0], email);
  } catch (error) {
    logErr('Failed to sign in with existing account:', error);
    throw new CodedError('Failed to link accounts, please try again', { code: 'auth/link-failed' });
  }

  try {
    (authCredential.providerId === auth.EmailAuthProvider.PROVIDER_ID)
      // Linking new email/password account to 3rd party oauth account requires updatePassword
      ? await auth().currentUser.updatePassword(authCredential.secret)
      // Linking 3rd party oauth account to another 3rd party oauth account or email/password account requires linkWithCredential
      : await auth().currentUser.linkWithCredential(authCredential);
    log('Accounts linked');
  } catch (error) {
    logErr('Failed to link accounts:', error);
    throw new CodedError('Failed to link accounts, please try again', { code: 'auth/link-failed' });
  }

  return auth().currentUser;
}

/**
 * Prompts the user to sign in with a specific sign in provider.
 *
 * @param {string} providerId The sign in provider ID (e.g. {@link auth.EmailAuthProvider.PROVIDER_ID}).
 * @param {string} emailPhone The email address or phone number of the sign in account.
 * @returns {Promise<FirebaseAuthTypes.User | FirebaseAuthTypes.ConfirmationResult>} A promise that resolves to the
 * signed in {@link FirebaseAuthTypes.User} when the sign in request is successful
 * or {@link FirebaseAuthTypes.ConfirmationResult} when the sign in request also requires a confirmation code.
 */
async function signInWithProvider(providerId, emailPhone) {
  switch (providerId) {
    case auth.AppleAuthProvider.PROVIDER_ID:    return signInWithApple();
    case auth.EmailAuthProvider.PROVIDER_ID:    return signInWithEmailAndPassword(emailPhone);
    case auth.FacebookAuthProvider.PROVIDER_ID: return signInWithFacebook();
    case auth.GithubAuthProvider.PROVIDER_ID:   throw new Error('GitHub sign in not supported');
    case auth.GoogleAuthProvider.PROVIDER_ID:   return signInWithGoogle();
    case auth.PhoneAuthProvider.PROVIDER_ID:    return signInWithPhoneNumber(emailPhone);
    case auth.TwitterAuthProvider.PROVIDER_ID:  throw new Error('Twitter sign in not supported');
    default:                                    throw new Error('Unknown sign in provider');
  }
}

/**
 * Prompts the user to enter their password.
 *
 * @param {string} email The email address of the account.
 * @param {string} [title='Link to Existing Account'] The title of the alert dialog.
 * @returns {Promise<string>} A promise that resolves to the user's password when they acknowledge the prompt.
 */
async function promptForPassword(email, title = 'Link to Existing Account') {
  return new Promise((resolve) => {
    Alert.prompt(
      title,
      `Please enter your password for your existing account:\n\n${email}`,
      [{ text: 'OK', onPress: resolve }],
      'secure-text',
      '',
      'password',
      { cancelable: false }
    );
  });
}
