import admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';
import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
import { auth } from 'firebase-functions';
import * as logger from 'firebase-functions/logger';

/**
 * Sync newly created user data from Firebase Auth to Firestore.
 */
export const createUser = auth.user().onCreate(async (user: UserRecord) => {
  const { uid, displayName, email, phoneNumber, photoURL } = user;

  if (!email && !phoneNumber) return; // Do not save anonymous user.

  try {
    const userDocSnapshot = await getFirestoreUser(uid);

    if (!userDocSnapshot.exists) {
      await admin.firestore().collection('users').doc(uid).create({
        displayName,
        email,
        phoneNumber,
        photoURL,
      });
    }
  } catch (error) {
    logger.error(`Error creating user document (${uid}) in Firestore:`, error, '\nWith auth user data:', user);
  }
});

/**
 * Sync deleted user data from Firebase Auth to Firestore.
 */
export const deleteUser = auth.user().onDelete(async (user: UserRecord) => {
  const { uid, email, phoneNumber } = user;

  if (!email && !phoneNumber) return; // Do not delete anonymous user.

  try {
    const userDocSnapshot = await getFirestoreUser(uid);

    if (userDocSnapshot.exists) {
      await admin.firestore().collection('users').doc(uid).delete();
    }
  } catch (error) {
    logger.error(`Error deleting user document (${uid}) from Firestore:`, error);
  }
});

/**
 * Get {@link UserRecord} data from Firebase Auth.
 *
 * @param uid The unique User ID.
 * @returns The {@link DocumentSnapshot<DocumentData>} or `null` if not found.
 * @throws Short Circuit {@link Error} if an error occurs.
 */
async function getFirestoreUser(uid: string): Promise<DocumentSnapshot<DocumentData>> {
  try {
    return await admin.firestore().collection('users').doc(uid).get();
  } catch (error) {
    logger.error(`Error fetching user document (${uid}) from Firestore:`, error);
    throw new Error('Short Circuit');
  }
}
