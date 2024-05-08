import SignInModal from '@components/sign-in-modal/SignInModal';
import { USER_BACKGROUND_COLORS } from '@constants/colors';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import { Address, UserDoc } from '@interfaces/user';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { setDBDoc } from '@util/db';
import Toast from 'react-native-root-toast';
import { DeepPartial, DeepReadonly } from 'utility-types';
import { hasSignInProvider, reloadAuthUser, updatePassword } from './auth';
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
   */
  readonly #docData: UserDoc;

  /**
   * Creates a new {@link User} instance.
   *
   * @param docData The raw {@link UserDBDoc} data.
   */
  constructor(docData?: UserDoc) {
    this.#docData = docData;
  }

  /**
   * The user background color.
   */
  get backgroundColor(): string {
    return this.isAnonymous
      ? 'grey'
      : USER_BACKGROUND_COLORS[this.uid.charCodeAt(0) % USER_BACKGROUND_COLORS.length];
  }

  /**
   * The user email address. If the user has no email address, then an empty string.
   */
  get email(): string {
    return this.#docData?.email || '';
  }

  /**
   * Indicates if the user email address has been verified.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get emailVerified(): boolean {
    return auth().currentUser?.emailVerified ?? false;
  }

  /**
   * The user first name. If the user has no first name, then an empty string.
   */
  get firstName(): string {
    return this.displayName.split(' ')[0];
  }

  /**
   * Indicates if the user has a password.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get hasPassword(): boolean {
    return this.isAuthenticated && hasSignInProvider(auth.EmailAuthProvider.PROVIDER_ID);
  }

  /**
   * The user initials. If the user has no initials, then an empty string.
   */
  get initials(): string {
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
   */
  get isAnonymous(): boolean {
    return auth().currentUser?.isAnonymous ?? false;
  }

  /**
   * Indicates if the user is authenticated.
   */
  get isAuthenticated(): boolean {
    return this.uid === auth().currentUser?.uid;
  }

  /**
   * Indicates if the user is linked with an Apple account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get isLinkedWithApple(): boolean {
    return this.isAuthenticated && hasSignInProvider(auth.AppleAuthProvider.PROVIDER_ID);
  }

  /**
   * Indicates if the user is linked with a Facebook account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get isLinkedWithFacebook(): boolean {
    return this.isAuthenticated && hasSignInProvider(auth.FacebookAuthProvider.PROVIDER_ID);
  }

  /**
   * Indicates if the user is linked with a Google account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get isLinkedWithGoogle(): boolean {
    return this.isAuthenticated && hasSignInProvider(auth.GoogleAuthProvider.PROVIDER_ID);
  }

  /**
   * The user last name. If the user has no last name, then an empty string.
   */
  get lastName(): string {
    const names = this.displayName.split(' ');
    return names.length > 1
      ? names.slice(-1)[0]
      : '';
  }

  /**
   * The user full/display name. If the user is anonymous, then `'Anonymous'`. If the user has no full/display name, then an empty string.
   */
  get displayName(): string {
    return this.isAnonymous
      ? 'Anonymous'
      : this.#docData?.displayName || '';
  }

  /**
   * The user phone number. If the user has no phone number, then an empty string.
   */
  get phoneNumber(): string {
    return this.#docData?.phoneNumber || '';
  }

  /**
   * The user photo URL. If the user has no photo URL, then an empty string.
   */
  get photoURL(): string {
    return this.#docData?.photoURL || '';
  }

  /**
   * The raw user data.
   */
  get rawData(): DeepReadonly<{ authUser?: FirebaseAuthTypes.User, docData?: UserDoc }> {
    return {
      authUser: this.isAuthenticated ? auth().currentUser : null,
      docData: this.#docData,
    };
  }

  /**
   * The user mailing address. If the user has no mailing address, then `null`.
   */
  get address(): Readonly<Address> {
    return this.#docData?.address;
  }

  /**
   * The user unique identifier.
   */
  get uid(): string {
    return this.#docData?.documentId || ''; // documentId and uid should be equivalent.
  }

  /**
   * The username. Either the display (full) name, or the email address without the domain.
   */
  get username(): string {
    return this.displayName || this.email?.split('@')[0] || '';
  }

  /**
   * Triggers a reload of the user data from the authentication server and remote database.
   * If the user is not authenticated, then nothing happens.
   *
   * @returns A promise that resolves when the user data reload is triggered.
   */
  async reload(): Promise<void> {
    if (this.isAuthenticated) {
      await reloadAuthUser();
    }
  }

  /**
   * Saves the user data to the remote database by merging in any updated field values.
   *
   * @param userData The raw {@link UserDoc} data to save.
   * @return A promise that resolves when the user data is saved.
   * @throws An {@link Error} is thrown if the user is not authenticated or anonymous.
   */
  async save(userData: DeepPartial<UserDoc>): Promise<void> {
    if (!userData) return;

    if (this.isAuthenticated && !this.isAnonymous) {
      try {
        // Record changes to specific fields
        const addressChanged = userData.address; // Address is always updated separately as whole object.
        const emailChanged = userData.email && userData.email !== this.email;
        const photoURLChanged = userData.photoURL && userData.photoURL !== this.photoURL;

        // If photo URL changed, upload new photo to remote storage bucket
        if (photoURLChanged) {
          log('Uploading user photo:', userData.photoURL);
          const remotePath = `users/${this.uid}/photo`;
          const { ref } = await uploadFile(userData.photoURL, remotePath);
          userData.photoURL = await ref.getDownloadURL();
          log('User photo uploaded:', userData.photoURL);
        }

        // Save user data document to remote database
        log('Saving user data:', userData);
        await setDBDoc('users', this.uid, userData, { merge: true });
        log('User data saved:', userData);

        // If email changed, must re-authenticate due to token invalidation
        if (emailChanged) {
          setLSItem(AUTH_SIGN_IN_LAST_EMAIL_KEY, userData.email);
          await showModalAsync(SignInModal, {
            prompt: 'Please sign-in again',
          });
        }

        // If new email is not verified, send verification email (can already be verified if set to 3rd party linked email account)
        if (emailChanged && !this.emailVerified) {
          log('Sending email verification message');
          await this.sendEmailVerification();
          Toast.show('Profile updated, please check your email for a verification message');
          log('Email verification message sent');
        } else if (addressChanged) {
          Toast.show('Address updated successfully');
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
   * @returns A promise that resolves when the email verification request is complete.
   * @throws An {@link Error} is thrown if the user is not authenticated or anonymous.
   */
  async sendEmailVerification(): Promise<void> {
    if (this.isAuthenticated && !this.isAnonymous) {
      await auth().currentUser.sendEmailVerification();
    } else {
      throw new Error('Cannot send email verification for unauthenticated or anonymous user');
    }
  }

  /**
   * Updates the user password.
   *
   * @param currentPassword The user's current password.
   * @param newPassword The user's new password.
   * @returns A promise that resolves when the password update request is successful.
   * @throws An {@link Error} is thrown when the password update request fails.
   */
  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    if (this.isAuthenticated && !this.isAnonymous) {
      await updatePassword(currentPassword, newPassword);
    } else {
      throw new Error('Cannot update password for unauthenticated or anonymous user');
    }
  }

}
