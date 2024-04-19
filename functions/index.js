const admin = require('firebase-admin');

admin.initializeApp();

exports.authUser = require('./user/sync-auth-to-firestore');
exports.firestoreUser = require('./user/sync-firestore-to-auth');
