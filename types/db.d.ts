import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

/**
 * A DB document.
 */
export interface Doc extends FirebaseFirestoreTypes.DocumentData {

  /**
   * The DB document's unique ID.
   */
  documentId: string;

}
