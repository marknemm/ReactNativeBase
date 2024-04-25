import SignInModal from '@components/sign-in-modal/SignInModal';
import { USER_BACKGROUND_COLORS } from '@constants/colors';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { setDBDoc } from '@util/db';
import Toast from 'react-native-root-toast';
import { hasSignInProvider, reloadAuthUser } from './auth';
import { setLSItem } from './local-storage';
import { log, logErr } from './log';
import { showModalAsync } from './modal';
import { uploadFile } from './remote-fs';

/**
 * Represents a {@link User}.
 */
export class User {

  /**
   * The raw user document data.
   *
   * @type {Types.User.UserDoc?}
   * @readonly
   */
  #docData;

  /**
   * Creates a new {@link User} instance.
   *
   * @param {Types.User.UserDoc} [docData] The raw {@link Types.User.UserDoc UserDoc} data.
   */
  constructor(docData) {
    this.#docData = docData;
  }

  /**
   * The user background color.
   *
   * @readonly
   */
  get backgroundColor() {
    return this.isAnonymous
      ? 'grey'
      : USER_BACKGROUND_COLORS[this.uid.charCodeAt(0) % USER_BACKGROUND_COLORS.length];
  }

  /**
   * The user email address. If the user has no email address, then an empty string.
   *
   * @type {string}
   * @readonly
   */
  get email() {
    return this.#docData?.email || '';
  }

  /**
   * Indicates if the user email address has been verified.
   * If this {@link User} object was constructed without authentication data, then `false`.
   *
   * @readonly
   */
  get emailVerified() {
    return auth().currentUser?.emailVerified ?? false;
  }

  /**
   * The user first name. If the user has no first name, then an empty string.
   *
   * @readonly
   */
  get firstName() {
    return this.displayName.split(' ')[0];
  }

  /**
   * Indicates if the user has a password.
   * If this {@link User} object was constructed without authentication data, then `false`.
   *
   * @readonly
   */
  get hasPassword() {
    return this.isAuthenticated && hasSignInProvider(auth.EmailAuthProvider.PROVIDER_ID);
  }

  /**
   * The user initials. If the user has no initials, then an empty string.
   *
   * @readonly
   */
  get initials() {
    let initials = '';

    if (!this.isAnonymous) {
      if (this.firstName) {
        initials = this.firstName.charAt(0).toUpperCase();
      }

      if (this.lastName) {
        initials += this.lastName.charAt(0).toUpperCase();
      }

      if (!initials && this.email) {
        initials = this.email.charAt(0).toUpperCase();
      }
    }

    return initials;
  }

  /**
   * Indicates if the user is anonymous.
   *
   * @readonly
   */
  get isAnonymous() {
    return auth().currentUser?.isAnonymous ?? false;
  }

  /**
   * Indicates if the user is authenticated.
   *
   * @readonly
   */
  get isAuthenticated() {
    return this.uid === auth().currentUser?.uid;
  }

  /**
   * Indicates if the user is linked with an Apple account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   *
   * @readonly
   */
  get isLinkedWithApple() {
    return this.isAuthenticated && hasSignInProvider(auth.AppleAuthProvider.PROVIDER_ID);
  }

  /**
   * Indicates if the user is linked with a Facebook account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   *
   * @readonly
   */
  get isLinkedWithFacebook() {
    return this.isAuthenticated && hasSignInProvider(auth.FacebookAuthProvider.PROVIDER_ID);
  }

  /**
   * Indicates if the user is linked with a Google account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   *
   * @readonly
   */
  get isLinkedWithGoogle() {
    return this.isAuthenticated && hasSignInProvider(auth.GoogleAuthProvider.PROVIDER_ID);
  }

  /**
   * The user last name. If the user has no last name, then an empty string.
   *
   * @readonly
   */
  get lastName() {
    const names = this.displayName.split(' ');
    return names.length > 1
      ? names.slice(-1)[0]
      : '';
  }

  /**
   * The user full/display name. If the user is anonymous, then `'Anonymous'`. If the user has no full/display name, then an empty string.
   *
   * @type {string}
   * @readonly
   */
  get displayName() {
    return this.isAnonymous
      ? 'Anonymous'
      : this.#docData?.displayName || '';
  }

  /**
   * The user phone number. If the user has no phone number, then an empty string.
   *
   * @type {string}
   * @readonly
   */
  get phoneNumber() {
    return this.#docData?.phoneNumber || '';
  }

  /**
   * The user photo URL. If the user has no photo URL, then an empty string.
   *
   * @type {string}
   * @readonly
   */
  get photoURL() {
    return this.#docData?.photoURL || '';
  }

  /**
   * The raw user data.
   *
   * @type {Types.DeepReadonly<{ authUser: FirebaseAuthTypes.User?, docData: Types.User.UserDoc? }>}
   * @readonly
   */
  get rawData() {
    return {
      authUser: this.isAuthenticated ? auth().currentUser : null,
      docData: this.#docData,
    };
  }

  /**
   * The user mailing address. If the user has no mailing address, then `null`.
   *
   * @type {Readonly<Types.User.Address>} The user mailing address.
   * @readonly
   */
  get address() {
    return this.#docData?.address;
  }

  /**
   * The user unique identifier.
   *
   * @type {string}
   * @readonly
   */
  get uid() {
    return this.#docData?.documentId || ''; // documentId and uid should be equivalent.
  }

  /**
   * The username. Either the display (full) name, or the email address without the domain.
   *
   * @readonly
   */
  get username() {
    return this.displayName || this.email?.split('@')[0] || '';
  }

  /**
   * Triggers a reload of the user data from the authentication server and remote database.
   * If the user is not authenticated, then nothing happens.
   *
   * @returns {Promise<void>} A promise that resolves when the user data reload is triggered.
   */
  async reload() {
    if (this.isAuthenticated) {
      await reloadAuthUser();
    }
  }

  /**
   * Saves the user data to the remote database by merging in any updated field values.
   *
   * @param {Types.DeepPartial<Types.User.UserDoc>} userData The raw {@link Types.User.UserDoc UserDoc} data to save.
   * @return {Promise<void>} A promise that resolves when the user data is saved.
   * @throws {Error} An error is thrown if the user is not authenticated or anonymous.
   */
  async save(userData) {
    if (!userData) return;

    if (this.isAuthenticated && !this.isAnonymous) {
      try {
        if (userData.photoURL !== undefined && userData.photoURL !== this.photoURL) {
          log('Uploading user photo:', userData.photoURL);
          const remotePath = `users/${this.uid}/photo`;
          const { ref } = await uploadFile(userData.photoURL, remotePath);
          userData.photoURL = await ref.getDownloadURL();
          log('User photo uploaded:', userData.photoURL);
        }

        log('Saving user data:', userData);
        await setDBDoc('users', this.uid, userData, { merge: true });
        log('User data saved:', userData);

        if (userData.email && userData.email !== this.email) {
          setLSItem(AUTH_SIGN_IN_LAST_EMAIL_KEY, userData.email);
          await showModalAsync(SignInModal, { // Must re-authenticate if email is changed
            prompt: 'Please sign-in again',
          });

          log('Sending email verification message');
          await this.sendEmailVerification();
          Toast.show('Profile updated, please check your email for a verification message');
          log('Email verification message sent');
        } else {
          Toast.show('Profile updated successfully');
        }
      } catch (error) {
        logErr('Error saving user data:', error);
        throw new Error('Error saving user data, please try again');
      }
    } else {
      throw new Error('Cannot save unauthenticated or anonymous user data');
    }
  }

  /**
   * Sends a user email verification request.
   *
   * @returns {Promise<void>} A promise that resolves when the email verification request is complete.
   * @throws {Error} An error is thrown if the user is not authenticated or anonymous.
   */
  async sendEmailVerification() {
    if (this.isAuthenticated && !this.isAnonymous) {
      await auth().currentUser.sendEmailVerification();
    } else {
      throw new Error('Cannot send email verification for unauthenticated or anonymous user');
    }
  }

}
