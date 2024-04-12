import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { logErr } from './log';

/**
 * Gets a document from a remote DB collection.
 * May return locally cached data if offline.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @returns {Promise<FirebaseFirestoreTypes.DocumentData>} A promise that resolves to the document data.
 * @throws {Error} An error is thrown if the operation unexpectedly fails.
 */
export async function getDBDoc(collectionPath, documentPath) {
  const snapshot = await firestore().collection(collectionPath).doc(documentPath).get();
  const docData = snapshot.data();
  docData.documentId = documentPath.split('/').pop();
  return docData;
}

/**
 * Gets a document in a remote DB collection. If the document does not yet exist, waits for it to be created.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @returns {Promise<FirebaseFirestoreTypes.DocumentData>} A promise that resolves to the document data.
 * @throws {Error} An error is thrown when the snapshot listener is unexpectedly disconnected or interrupted.
 */
export async function waitForDBDoc(collectionPath, documentPath) {
  return new Promise((resolve, reject) => {
    listenForDBDoc(collectionPath, documentPath, resolve, reject);
  });
}

/**
 * Gets a document in a remote DB collection. If the document does not yet exist, listens for it to be created.
 * The listener is automatically unsubscribed after the document is retrieved or an error occurs.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @param {(docData: FirebaseFirestoreTypes.DocumentData) => void} onSuccess A callback function that receives the document data.
 * @param {(error: Error) => void} [onError] A callback function that receives an error if the operation fails.
 * @returns {() => void} A function that unsubscribes the listener.
 */
export function listenForDBDoc(collectionPath, documentPath, onSuccess, onError) {
  const unsubscribe = firestore().collection(collectionPath).doc(documentPath).onSnapshot(
    (snapshot) => {
      if (snapshot.exists) {
        unsubscribe();
        const docData = snapshot.data();
        docData.documentId = documentPath.split('/').pop();
        onSuccess(docData);
      }
    },
    (error) => {
      unsubscribe();
      onError
        ? onError(error)
        : logErr('Failed to listen for document:', error);
    }
  );
  return unsubscribe;
}

/**
 * Waits for a document to be deleted in a remote DB collection.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @returns {Promise<void>} A promise that resolves when the document is deleted.
 * @throws {Error} An error is thrown when the snapshot listener is unexpectedly disconnected or interrupted.
 */
export async function waitUntilDBDocDeleted(collectionPath, documentPath) {
  return new Promise((resolve, reject) => {
    onDBDocDeleted(collectionPath, documentPath, resolve, reject);
  });
}

/**
 * Listens for a document to be deleted in a remote DB collection.
 * The listener is automatically unsubscribed after the document is detected to be deleted or an error occurs.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @param {() => void} onSuccess A callback function that is called when the document is deleted.
 * @param {(error: Error) => void} [onError] A callback function that receives an error if the operation fails.
 * @returns {() => void} A function that unsubscribes the listener.
 */
export function onDBDocDeleted(collectionPath, documentPath, onSuccess, onError) {
  const unsubscribe = firestore().collection(collectionPath).doc(documentPath).onSnapshot(
    (snapshot) => {
      if (!snapshot.exists) {
        unsubscribe();
        onSuccess();
      }
    },
    (error) => {
      unsubscribe();
      onError
        ? onError(error)
        : logErr('Failed to listen for deleted document:', error);
    }
  );
  return unsubscribe;
}
