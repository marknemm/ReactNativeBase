const functions = require('firebase-functions');
const admin = require('firebase-admin');
const logger = require('firebase-functions/logger');
const { UserRecord } = require('firebase-admin/auth');

/**
 * Sync newly created user data from Firestore to Firebase Auth.
 */
exports.createUser = functions.firestore.document('users/{userId}').onCreate(async (snapshot, context) => {
  const { userId } = context.params;
  const user = snapshot.data();

  try {
    const authUser = await getAuthUser(userId);

    if (!authUser) {
      await admin.auth().createUser({
        uid: userId,
        displayName: user.displayName || undefined,
        email: user.email,
        phoneNumber: user.phoneNumber || undefined,
        photoURL: user.photoURL || undefined,
      });
    }
  } catch (error) {
    logger.error(`Error creating user (${userId}) in Firebase Auth:`, error, '\nWith user data:', user);
  }
});

/**
 * Sync updated user data from Firestore to Firebase Auth.
 */
exports.updateUser = functions.firestore.document('users/{userId}').onUpdate(async (snapshot, context) => {
  const { userId } = context.params;
  const user = snapshot.after.data();

  try {
    const authUser = await getAuthUser(userId);

    // Only update email if it has changed to prevent changing verification status.
    const email = (user.email !== authUser.email)
      ? (user.email || null)
      : undefined;

    // Only update phone number if it has changed to prevent changing verification status.
    let phoneNumber = (user.phoneNumber !== authUser.phoneNumber)
      ? (user.phoneNumber || null)
      : undefined;
    // Make sure phone number is E.164 standard compliant.
    if (phoneNumber && !phoneNumber.startsWith('+')) {
      phoneNumber = `+1 ${phoneNumber}`;
    }

    await admin.auth().updateUser(userId, {
      displayName: user.displayName || null,
      email,
      phoneNumber,
      photoURL: user.photoURL || null,
    });
  } catch (error) {
    logger.error(`Error updating user (${userId}) in Firebase Auth:`, error, '\nWith user data:', user);
  }
});

/**
 * Sync deleted user data from Firestore to Firebase Auth & Storage.
 */
exports.deleteUser = functions.firestore.document('users/{userId}').onDelete(async (snapshot, context) => {
  const { userId } = context.params;
  const user = snapshot.data();

  // Clean up user photo if it exists in Firebase Storage bucket.
  try {
    if (user.photoURL) {
      const photoFile = await admin.storage().bucket().file(user.photoURL);
      if (await photoFile.exists()) {
        await photoFile.delete();
      }
    }
  } catch (error) {
    logger.error(`Error deleting user photo (${user.photoURL}):`, error);
  }

  // Delete user from Firebase Auth.
  try {
    if (await getAuthUser(userId)) {
      await admin.auth().deleteUser(userId);
    }
  } catch (error) {
    logger.error(`Error deleting user (${userId}) from Firebase Auth:`, error);
  }
});

/**
 * Get {@link UserRecord} data from Firebase Auth.
 *
 * @param {string} userId The unique User ID.
 * @returns {Promise<UserRecord>} The {@link UserRecord} or `null` if not found.
 * @throws {Error} Short Circuit `Error` if an error occurs.
 */
async function getAuthUser(userId) {
  try {
    return await admin.auth().getUser(userId);
  } catch (error) {
    logger.error(`Error fetching user (${userId}) from Firebase Auth:`, error);
    throw new Error('Short Circuit');
  }
}
