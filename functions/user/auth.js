const functions = require('firebase-functions');
const admin = require('firebase-admin');
const logger = require('firebase-functions/logger');

/**
 * Sync newly created user data from Firebase Auth to Firestore.
 */
exports.createUser = functions.auth.user().onCreate(async (user) => {
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
exports.deleteUser = functions.auth.user().onDelete(async (user) => {
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
 * @param {string} uid The unique User ID.
 * @returns {Promise<admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>>}
 * The {@link admin.firestore.DocumentSnapshot<admin.firestore.DocumentData> User doc snapshot} or `null` if not found.
 * @throws {Error} Short Circuit `Error` if an error occurs.
 */
async function getFirestoreUser(uid) {
  try {
    return await admin.firestore().collection('users').doc(uid).get();
  } catch (error) {
    logger.error(`Error fetching user document (${uid}) from Firestore:`, error);
    throw new Error('Short Circuit');
  }
}
