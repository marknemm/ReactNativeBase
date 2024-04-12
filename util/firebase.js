import { FIREBASE_EMU_AUTH_PORT, FIREBASE_EMU_FIRESTORE_PORT, FIREBASE_EMU_FUNCTIONS_PORT, FIREBASE_EMU_HOST, FIREBASE_EMU_STORAGE_PORT } from '@env';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/functions';
import '@react-native-firebase/storage';

/**
 * Initialize Firebase with emulator settings if in development mode.
 */
export function initFirebaseEnv() {
  if (__DEV__) {
    firebase.auth().useEmulator(`http://${FIREBASE_EMU_HOST}:${FIREBASE_EMU_AUTH_PORT}`);
    firebase.firestore().useEmulator(FIREBASE_EMU_HOST, FIREBASE_EMU_FIRESTORE_PORT);
    firebase.functions().useEmulator(FIREBASE_EMU_HOST, FIREBASE_EMU_FUNCTIONS_PORT);
    firebase.storage().useEmulator(FIREBASE_EMU_HOST, FIREBASE_EMU_STORAGE_PORT);
  }
}
