const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * Sync newly created user data from Firestore to Firebase Auth.
 */
exports.createUser = functions.firestore.document('users/{userId}').onCreate(async (snapshot, context) => {
  const { userId } = context.params;
  const user = snapshot.data();
  const authUser = await admin.auth().getUser(userId);

  return !authUser
    ? admin.auth().createUser({
      uid: userId,
      displayName: user.displayName || undefined,
      email: user.email,
      phoneNumber: user.phoneNumber || undefined,
      photoURL: user.photoURL || undefined,
    })
    : authUser;
});

/**
 * Sync updated user data from Firestore to Firebase Auth.
 */
exports.updateUser = functions.firestore.document('users/{userId}').onUpdate(async (snapshot, context) => {
  const { userId } = context.params;
  const user = snapshot.after.data();

  // Only update email/phoneNumber if it has changed to prevent changing verification status.
  const authUser = await admin.auth().getUser(userId);
  const email = (user.email !== authUser.email)
    ? (user.email || null)
    : undefined;
  let phoneNumber = (user.phoneNumber !== authUser.phoneNumber)
    ? (user.phoneNumber || null)
    : undefined;

  // Make sure phone number is E.164 standard compliant.
  if (phoneNumber && !phoneNumber.startsWith('+')) {
    phoneNumber = `+1 ${phoneNumber}`;
  }

  return admin.auth().updateUser(userId, {
    displayName: user.displayName || null,
    email,
    phoneNumber,
    photoURL: user.photoURL || null,
  });
});

/**
 * Sync deleted user data from Firestore to Firebase Auth.
 */
exports.deleteUser = functions.firestore.document('users/{userId}').onDelete(async (snapshot, context) => {
  const { userId } = context.params;

  return await admin.auth().getUser(userId)
    ? admin.auth().deleteUser(userId)
    : null;
});
