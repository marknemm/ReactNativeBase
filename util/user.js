import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

/**
 * Represents a user.
 */
export class User {

  /**
   * The authenticated user data.
   *
   * @type {FirebaseAuthTypes.User?}
   * @readonly
   */
  #authUser;

  /**
   * The raw user document data.
   *
   * @type {FirebaseFirestoreTypes.DocumentData?}
   * @readonly
   */
  #docData;

  /**
   * Creates a new profile instance.
   *
   * @param {FirebaseFirestoreTypes.DocumentData} [docData] The raw user document data.
   * @param {FirebaseAuthTypes.User} [authUser] The authenticated user data.
   */
  constructor(docData, authUser) {
    this.#docData = docData;
    this.#authUser = authUser;
  }

  /**
   * The user email address. If the user has no email address, then an empty string.
   *
   * @readonly
   */
  get email() {
    return this.#docData?.email || this.#authUser?.email || '';
  }

  /**
   * Indicates if the user email address has been verified.
   * If this {@link User} object was constructed without authentication data, then `null`.
   *
   * @readonly
   */
  get emailVerified() {
    return this.#authUser?.emailVerified;
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
   * The user initials. If the user has no initials, then an empty string.
   *
   * @readonly
   */
  get initials() {
    let initials = '';

    if (this.firstName) {
      initials = this.firstName.charAt(0);
    }

    if (this.lastName) {
      initials += this.lastName.charAt(0);
    }

    if (!initials && this.email) {
      initials = this.email.charAt(0);
    }

    return initials;
  }

  /**
   * Indicates if the user is anonymous.
   *
   * @readonly
   */
  get isAnonymous() {
    return this.#authUser?.isAnonymous ?? false;
  }

  /**
   * Indicates if the user is authenticated.
   *
   * @readonly
   */
  get isAuthenticated() {
    return this.#authUser != null;
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
      : this.#docData?.displayName || this.#authUser?.displayName || '';
  }

  /**
   * The user phone number. If the user has no phone number, then an empty string.
   *
   * @readonly
   */
  get phoneNumber() {
    return this.#docData?.phoneNumber || this.#authUser?.phoneNumber || '';
  }

  /**
   * The user photo URL. If the user has no photo URL, then an empty string.
   *
   * @readonly
   */
  get photoURL() {
    return this.#docData?.photoURL || this.#authUser?.photoURL || '';
  }

  /**
   * The user unique identifier.
   *
   * @readonly
   */
  get uid() {
    return this.#docData?.documentId || this.#authUser?.uid || ''; // documentId and uid should be equivalent.
  }

  /**
   * Sends a user email verification request.
   * If this {@link User} object was constructed without authentication data, then skips send.
   *
   * @returns {Promise<void>} A promise that resolves when the email verification request is complete.
   */
  async sendEmailVerification() {
    await this.#authUser?.sendEmailVerification();
  }

}
