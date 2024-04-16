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
 * Listens for changes in a document in a remote DB collection.
 * If the document does not yet exist, listens for it to be created.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @param {(docData: FirebaseFirestoreTypes.DocumentData) => void} onSuccess A callback function that receives the document data.
 * @param {(error: Error) => void} [onError] A callback function that receives an error if the operation fails.
 * @returns {() => void} A function that unsubscribes the listener.
 */
export function listenDBDoc(collectionPath, documentPath, onSuccess, onError) {
  return firestore().collection(collectionPath).doc(documentPath).onSnapshot(
    (snapshot) => {
      if (snapshot.exists) {
        const docData = snapshot.data();
        docData.documentId = documentPath.split('/').pop();
        onSuccess(docData);
      }
    },
    (error) => {
      onError
        ? onError(error)
        : logErr('Failed to listen for document:', error);
    }
  );
}
