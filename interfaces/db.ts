import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

/**
 * A DB document.
 *
 * @extends FirebaseFirestoreTypes.DocumentData The Firestore {@link FirebaseFirestoreTypes.DocumentData DocumentData}.
 */
export interface DBDocData extends FirebaseFirestoreTypes.DocumentData {

  /**
   * The DB document's unique ID.
   */
  documentId: string;

}
