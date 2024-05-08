
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { logErr } from './log';
import { DBDocData } from '@interfaces/db';

/**
 * Gets a document from a remote DB collection.
 * May return locally cached data if offline.
 *
 * @param collectionPath A slash-separated path to a collection.
 * @param documentPath A slash-separated path to a document.
 * @returns A promise that resolves to the {@link DBDocData}.
 * @throws An error is thrown if the operation unexpectedly fails.
 */
export async function getDBDoc(collectionPath: string, documentPath: string): Promise<DBDocData> {
  const snapshot = await firestore().collection(collectionPath).doc(documentPath).get();
  const docData = toDBDoc(snapshot.data(), documentPath);
  return docData;
}

/**
 * Listens for changes in a document in a remote DB collection.
 * If the document does not yet exist, listens for it to be created.
 *
 * @param collectionPath A slash-separated path to a collection.
 * @param documentPath A slash-separated path to a document.
 * @param onSuccess A callback function that receives the {@link DBDocData}.
 * @param onError A callback function that receives an {@link Error} if the operation fails.
 * @returns A function that unsubscribes the listener.
 */
export function listenDBDoc(
  collectionPath: string,
  documentPath: string,
  onSuccess: (docData: DBDocData) => void,
  onError = (error: Error) => logErr('Failed to listen for document:', error)
): () => void {
  return firestore().collection(collectionPath).doc(documentPath).onSnapshot(
    (snapshot) => {
      if (snapshot.exists) {
        const docData = toDBDoc(snapshot.data(), documentPath);
        onSuccess(docData);
      }
    },
    onError
  );
}

/**
 * Sets a document in a remote DB collection.
 * If the document does not yet exist, it will be created.
 *
 * @param collectionPath A slash-separated path to a collection.
 * @param documentPath A slash-separated path to a document.
 * @param docData The document data to set.
 * @param options The set options that specify merge strategies.
 * @returnsA promise that resolves when the operation is complete.
 */
export async function setDBDoc(
  collectionPath: string,
  documentPath: string,
  docData: FirebaseFirestoreTypes.DocumentData,
  options: FirebaseFirestoreTypes.SetOptions = {}
): Promise<void> {
  return firestore().collection(collectionPath).doc(documentPath).set(docData, options);
}

/**
 * Converts raw document data to a DBDoc object.
 * Adds the `documentId` property to the document data.
 *
 * @param data The raw document data.
 * @param documentPath The slash-separated path to the document.
 * @returns The DBDoc object.
 */
function toDBDoc(data: FirebaseFirestoreTypes.DocumentData, documentPath: string): DBDocData {
  data.documentId = documentPath.split('/').pop();
  return data as DBDocData;
}
