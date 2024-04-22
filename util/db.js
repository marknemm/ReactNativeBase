import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { logErr } from './log';

/**
 * Gets a document from a remote DB collection.
 * May return locally cached data if offline.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @returns {Promise<Types.DB.Doc>} A promise that resolves to the document data.
 * @throws {Error} An error is thrown if the operation unexpectedly fails.
 */
export async function getDBDoc(collectionPath, documentPath) {
  const snapshot = await firestore().collection(collectionPath).doc(documentPath).get();
  const docData = toDBDoc(snapshot.data(), documentPath);
  return docData;
}

/**
 * Listens for changes in a document in a remote DB collection.
 * If the document does not yet exist, listens for it to be created.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @param {(docData: Types.DB.Doc) => void} onSuccess A callback function that receives the document data.
 * @param {(error: Error) => void} [onError] A callback function that receives an error if the operation fails.
 * @returns {() => void} A function that unsubscribes the listener.
 */
export function listenDBDoc(collectionPath, documentPath, onSuccess, onError) {
  return firestore().collection(collectionPath).doc(documentPath).onSnapshot(
    (snapshot) => {
      if (snapshot.exists) {
        const docData = toDBDoc(snapshot.data(), documentPath);
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

/**
 * Sets a document in a remote DB collection.
 * If the document does not yet exist, it will be created.
 *
 * @param {string} collectionPath A slash-separated path to a collection.
 * @param {string} documentPath A slash-separated path to a document.
 * @param {FirebaseFirestoreTypes.DocumentData} docData The document data to set.
 * @param {FirebaseFirestoreTypes.SetOptions} [options] The set options that specify merge strategies.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function setDBDoc(collectionPath, documentPath, docData, options) {
  return firestore().collection(collectionPath).doc(documentPath).set(docData, options);
}

/**
 * Converts raw document data to a DBDoc object.
 * Adds the `documentId` property to the document data.
 *
 * @param {FirebaseFirestoreTypes.DocumentData} data The raw document data.
 * @param {string} documentPath The slash-separated path to the document.
 * @returns {Types.DB.Doc} The DBDoc object.
 */
function toDBDoc(data, documentPath) {
  /** @type {Types.DB.Doc} */ // @ts-ignore - Force type cast to more specific type DBDoc
  const docData = data;
  docData.documentId = documentPath.split('/').pop();
  return docData;
}
