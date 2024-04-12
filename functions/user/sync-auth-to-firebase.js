const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, displayName, email, phoneNumber, photoURL } = user;

  if (!email && !phoneNumber) { // Do not save anonymous user.
    return null;
  }

  return admin.firestore().collection('users').doc(uid).create({
    displayName,
    email,
    phoneNumber,
    photoURL,
  });
});

exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid, email, phoneNumber } = user;

  if (!email && !phoneNumber) { // Do not delete anonymous user.
    return null;
  }

  return admin.firestore().collection('users').doc(uid).delete();
});
