import { AUTH_LOGIN_LAST_EMAIL_KEY } from '@constants/storage-keys';
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
 * Performs a user login request.
 *
 * @param {string} email The user email address.
 * @param {string} password The user password.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in {@link FirebaseAuthTypes.User} when the login request is successful.
 * @throws {Error} An error is thrown when the login request fails.
 */
export async function login(email, password) {
  log('Logging in with email:', email);

  try {
    await auth().signInWithEmailAndPassword(email, password);
    log(`${email} logged in`);
  } catch (error) {
    await handleAuthError(error, email, auth.EmailAuthProvider.credential(email, password));
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
 * Performs an Apple login request.
 *
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in {@link FirebaseAuthTypes.User} when the login request is successful.
 */
export async function loginWithApple() {
  let authCredential, email;
  log('Logging in with Apple');

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
    await loginWithCredential(authCredential, email);
  } catch (error) {
    switch (error.code) {
      case 'ERR_REQUEST_CANCELLED': throw new Error(''); // User cancelled login, do not present visible error
      default:                      await handleAuthError(error, email, authCredential);
    }
  }

  return auth().currentUser;
}

/**
 * Performs a Facebook login request.
 *
 * @param {Record<string, unknown>} [loginError] The error that occurred during the login request. Only expected with `loginResult`.
 * @param {import('react-native-fbsdk-next').LoginResult} [loginResult] The Facebook login result. If not given, will prompt user to login.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in {@link FirebaseAuthTypes.User} when the login request is successful.
 */
export async function loginWithFacebook(loginError, loginResult) {
  let authCredential, email;
  log('Logging in with Facebook');

  try {
    if (loginError) logThrowErr(loginError); // If external login button produced error, throw it

    // Present modal to sign into Facebook account with public profile and email permissions
    loginResult ??= await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (loginResult.isCancelled) {
      throw new CodedError('Sign in request cancelled', { code: 'ERR_REQUEST_CANCELLED' });
    }

    // Get Facebook access token upon successful login and create a Facebook credential with it
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    authCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    email = await getFBEmail(); // Have to use custom instead of Profile.getCurrentProfile() due to Android SDK limitations

    // Sign-in the user with the Facebook credential
    await loginWithCredential(authCredential, email);
  } catch (error) {
    LoginManager.logOut();
    switch (error.code) {
      case 'ERR_REQUEST_CANCELLED': throw new Error(''); // User cancelled login, do not present visible error
      default:                      await handleAuthError(error, email, authCredential);
    }
  }

  return auth().currentUser;
}

/**
 * Performs a Google login request.
 *
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in {@link FirebaseAuthTypes.User} when the login request is successful.
 */
export async function loginWithGoogle() {
  let authCredential, email;
  log('Logging in with Google');

  try {
    // Show Play services update dialog on Android since must be up-to-date to show sign-in modal
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Present modal to sign into Gmail account and create Google credential with Gmail ID token
    const { idToken, user } = await GoogleSignin.signIn();
    authCredential = auth.GoogleAuthProvider.credential(idToken);
    email = user.email;

    await loginWithCredential(authCredential, email);
  } catch (error) {
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:           throw new Error(''); // User cancelled login, do not present visible error
      case statusCodes.IN_PROGRESS:                 throw new Error('Google sign in already in progress');
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: throw new Error('Google sign in is not available');
      default:                                      await handleAuthError(error, email, authCredential);
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
 * @param {string} email The user email address.
 * @param {string} password The user password.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the signed up {@link FirebaseAuthTypes.User} when the signup request is successful.
 * @throws {Error} An error is thrown when the signup request fails.
 */
export async function signup(email, password) {
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

// --- PRIVATE HELPER FUNCTIONS --- //

/**
 * Handles 3rd party Oauth credential login.
 * Handles case where account already exists with email by linking accounts.
 *
 * @param {FirebaseAuthTypes.AuthCredential} authCredential The auth credential used for login.
 * @param {string} email The email address of the account.
 * @returns {Promise<void>} A promise that resolves when the login request is successful.
 */
async function loginWithCredential(authCredential, email) {
  email ??= getLSItem(AUTH_LOGIN_LAST_EMAIL_KEY);
  const signInMethods = email
    ? await auth().fetchSignInMethodsForEmail(email)
    : [];

  // Check if account already exists with email - have to do before attempting login to prevent email/password account clobbering bug
  (signInMethods.length === 1 && signInMethods.includes(auth.EmailAuthProvider.PROVIDER_ID))
    // Account already registered with email, link current account with 3rd party Oauth account
    ? await attemptLinkAccounts(email, authCredential)
    // Sign in with 3rd party credential and implicitly create account based on 3rd party Oauth data
    : await auth().signInWithCredential(authCredential);

  log('Logged in with:', authCredential.providerId);
}

/**
 * Handles an authentication error based on the error code.
 *
 * @param {CodedError} error The authentication {@link CodedError error}.
 * @param {string} email The email address of the account.
 * @param {FirebaseAuthTypes.AuthCredential} authCredential The auth credential used for the failed authentication.
 * @param {string} [authAction='Login'] The authentication action that failed (e.g. 'Login', 'Signup').
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that typically rejects with an error message based on the error code.
 * If the error code is equivalent to `auth/email-already-in-use`, if account link is successful, the promise resolves to the linked {@link FirebaseAuthTypes.User}.
 */
async function handleAuthError(error, email, authCredential, authAction = 'Login') {
  log(`(${authAction} - ${email}) auth error:`, error);

  switch (error.code) {
    case 'auth/email-already-in-use':    return attemptLinkAccounts(email, authCredential);
    case 'auth/invalid-email':           throw new Error('Invalid email address');
    case 'auth/link-failed':             throw new Error('Failed to link accounts, please try again');
    case 'auth/provider-already-linked': throw new Error('Account already exists, please login instead');
    case 'auth/user-disabled':           throw new Error('Account is disabled, please contact support');
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    default:                             throw new Error(`${authAction} failed, please try again`);
  }
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

  // Get current account(s) / sign-in method(s) and check if account already exists
  const signInMethods = await auth().fetchSignInMethodsForEmail(email);
  if (signInMethods.includes(authCredential.providerId)) {
    throw new CodedError('Account already exists, please login instead', { code: 'auth/provider-already-linked' });
  }

  // Login with the first available provider of existing account to link with new account
  try {
    await loginWithProvider(signInMethods[0], email);
  } catch (error) {
    logErr('Failed to login with existing account:', error);
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
 * Prompts the user to login with a specific login provider.
 *
 * @param {string} providerId The login provider ID (e.g. {@link auth.EmailAuthProvider.PROVIDER_ID}).
 * @param {string} email The email address of the login account.
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the logged in {@link FirebaseAuthTypes.User} when the login request is successful.
 */
async function loginWithProvider(providerId, email) {
  switch (providerId) {
    case auth.AppleAuthProvider.PROVIDER_ID:    return loginWithApple();
    case auth.EmailAuthProvider.PROVIDER_ID:    return login(email, await promptForPassword(email));
    case auth.FacebookAuthProvider.PROVIDER_ID: return loginWithFacebook();
    case auth.GithubAuthProvider.PROVIDER_ID:   throw new Error('GitHub login not supported');
    case auth.GoogleAuthProvider.PROVIDER_ID:   return loginWithGoogle();
    case auth.PhoneAuthProvider.PROVIDER_ID:    throw new Error('Phone login not supported');
    case auth.TwitterAuthProvider.PROVIDER_ID:  throw new Error('Twitter login not supported');
    default:                                    throw new Error('Unknown login provider');
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
