const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * Sync newly created user data from Firebase Auth to Firestore.
 */
exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, displayName, email, phoneNumber, photoURL } = user;

  if (!email && !phoneNumber) { // Do not save anonymous user.
    return null;
  }

  const userRecord = await admin.firestore().collection('users').doc(uid).get();

  return !userRecord.exists
    ? admin.firestore().collection('users').doc(uid).create({
      displayName,
      email,
      phoneNumber,
      photoURL,
    })
    : userRecord;
});

/**
 * Sync deleted user data from Firebase Auth to Firestore.
 */
exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid, email, phoneNumber } = user;

  if (!email && !phoneNumber) { // Do not delete anonymous user.
    return null;
  }

  const userRecord = await admin.firestore().collection('users').doc(uid).get();

  return userRecord.exists
    ? admin.firestore().collection('users').doc(uid).delete()
    : null;
});
