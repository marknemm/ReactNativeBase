import SignInModal from '@components/sign-in-modal/SignInModal';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import type { Callback } from '@interfaces/callbacks';
import type { Address, UserDoc } from '@interfaces/user';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getAuthUser, hasSignInProvider, reloadAuthUser, updatePassword } from '@util/auth';
import { getBackgroundColor } from '@util/colors';
import { getDBDoc, listenDBDoc, setDBDoc } from '@util/db';
import { setLSItem } from '@util/local-storage';
import { log, logErr } from '@util/log';
import { showModalAsync } from '@util/modal';
import { uploadFile } from '@util/remote-fs';
import Toast from 'react-native-root-toast';
import type { DeepPartial, DeepReadonly } from 'utility-types';

/**
 * Represents a {@link User}.
 */
export default class User {

  /**
   * The raw {@link User} document data.
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
   * The {@link User} background color.
   */
  get backgroundColor(): string {
    return this.isAnonymous
      ? 'grey'
      : getBackgroundColor(this.id);
  }

  /**
   * The {@link User} email address. If the {@link User} has no email address, then an empty string.
   */
  get email(): string {
    return this.#docData?.email || '';
  }

  /**
   * Indicates if the {@link User} email address has been verified.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get emailVerified(): boolean {
    return getAuthUser()?.emailVerified ?? false;
  }

  /**
   * The {@link User} first name. If the {@link User} has no first name, then an empty string.
   */
  get firstName(): string {
    return this.displayName.split(' ')[0];
  }

  /**
   * Indicates if the {@link User} has a password.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get hasPassword(): boolean {
    return this.isAuthenticated && hasSignInProvider(auth.EmailAuthProvider.PROVIDER_ID);
  }

  /**
   * The {@link User} unique identifier.
   */
  get id(): string {
    return this.#docData?.id || '';
  }

  /**
   * The {@link User} initials. If the {@link User} has no initials, then an empty string.
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
   * Indicates if the {@link User} is anonymous.
   */
  get isAnonymous(): boolean {
    return getAuthUser()?.isAnonymous ?? false;
  }

  /**
   * Indicates if the {@link User} is authenticated.
   */
  get isAuthenticated(): boolean {
    return this.id === getAuthUser()?.uid;
  }

  /**
   * Indicates if the {@link User} is linked with an Apple account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get isLinkedWithApple(): boolean {
    return this.isAuthenticated && hasSignInProvider(auth.AppleAuthProvider.PROVIDER_ID);
  }

  /**
   * Indicates if the {@link User} is linked with a Facebook account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get isLinkedWithFacebook(): boolean {
    return this.isAuthenticated && hasSignInProvider(auth.FacebookAuthProvider.PROVIDER_ID);
  }

  /**
   * Indicates if the {@link User} is linked with a Google account.
   * If this {@link User} object was constructed without authentication data, then `false`.
   */
  get isLinkedWithGoogle(): boolean {
    return this.isAuthenticated && hasSignInProvider(auth.GoogleAuthProvider.PROVIDER_ID);
  }

  /**
   * The {@link User} last name. If the {@link User} has no last name, then an empty string.
   */
  get lastName(): string {
    const names = this.displayName.split(' ');
    return names.length > 1
      ? names.slice(-1)[0]
      : '';
  }

  /**
   * The {@link User} full/display name. If the {@link User} is anonymous, then `'Anonymous'`.
   * If the {@link User} has no full/display name, then an empty string.
   */
  get displayName(): string {
    return this.isAnonymous
      ? 'Anonymous'
      : this.#docData?.displayName || '';
  }

  /**
   * The {@link User} phone number. If the {@link User} has no phone number, then an empty string.
   */
  get phoneNumber(): string {
    return this.#docData?.phoneNumber || '';
  }

  /**
   * The {@link User} photo URL. If the {@link User} has no photo URL, then an empty string.
   */
  get photoURL(): string {
    return this.#docData?.photoURL || '';
  }

  /**
   * The raw {@link User} data.
   */
  get rawData(): DeepReadonly<{ authUser?: FirebaseAuthTypes.User, docData?: UserDoc }> {
    return {
      authUser: this.isAuthenticated ? getAuthUser() : null,
      docData: this.#docData,
    };
  }

  /**
   * The {@link User} mailing address. If the {@link User} has no mailing address, then `null`.
   */
  get address(): Readonly<Address> {
    return this.#docData?.address;
  }

  /**
   * The username. Either the display (full) name, or the email address without the domain.
   */
  get username(): string {
    return this.displayName || this.email?.split('@')[0] || '';
  }

  /**
   * Triggers a reload of the {@link User} data from the authentication server and remote database.
   * If the {@link User} is not authenticated, then nothing happens.
   *
   * @returns A promise that resolves when the {@link User} data reload is triggered.
   */
  async reload(): Promise<void> {
    if (this.isAuthenticated) {
      await reloadAuthUser();
    }
  }

  /**
   * Saves the {@link User} data to the remote database by merging in any updated field values.
   *
   * @param userData The raw {@link UserDoc} data to save.
   * @return A promise that resolves when the {@link User} data is saved.
   * @throws An {@link Error} is thrown if the {@link User} is not authenticated or anonymous.
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
          const remotePath = `users/${this.id}/photo`;
          const { ref } = await uploadFile(userData.photoURL, remotePath);
          userData.photoURL = await ref.getDownloadURL();
          log('User photo uploaded:', userData.photoURL);
        }

        // Save user data document to remote database
        log('Saving user data:', userData);
        await setDBDoc('users', this.id, userData, { merge: true });
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
   * Sends a {@link User} email verification request.
   *
   * @returns A promise that resolves when the email verification request is complete.
   * @throws An {@link Error} is thrown if the {@link User} is not authenticated or anonymous.
   */
  async sendEmailVerification(): Promise<void> {
    if (this.isAuthenticated && !this.isAnonymous) {
      await getAuthUser().sendEmailVerification();
    } else {
      throw new Error('Cannot send email verification for unauthenticated or anonymous user');
    }
  }

  /**
   * Updates the {@link User} password.
   *
   * @param currentPassword The {@link User}'s current password.
   * @param newPassword The {@link User}'s new password.
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

/**
 * Listens to a {@link User} document in the remote database.
 *
 * @param id The {@link User} unique identifier.
 * @param onSuccess The success callback function that receives an updated {@link User} object on document change.
 * @param onError The error callback function.
 * @returns An unsubscribe function to stop listening to the {@link User} document.
 */
export function listenUser(id: string, onSuccess: Callback<User | null>, onError?: Callback): () => void {
  const onSuccessUser = (userDoc: UserDoc) => onSuccess(userDoc ? new User(userDoc) : null);
  return listenDBDoc<UserDoc>('users', id, onSuccessUser, onError);
}

/**
 * Loads a {@link User} from the remote database.
 *
 * @param id The {@link User} unique identifier.
 * @returns A promise that resolves to the {@link User}.
 */
export async function loadUser(id: string): Promise<User | null> {
  return getDBDoc('users', id, (userDoc) => (userDoc ? new User(userDoc) : null));
}
