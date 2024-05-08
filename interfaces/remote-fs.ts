import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import { ReactNativeFirebase } from '@react-native-firebase/app';

/**
 * Container for a {@link FirebaseStorageTypes.Reference Reference} and {@link FirebaseStorageTypes.Task Task}.
 */
export interface RefTask {

  /**
   * A {@link FirebaseStorageTypes.Reference Reference} to the remote storage file.
   */
  ref: FirebaseStorageTypes.Reference;

  /**
   * A {@link FirebaseStorageTypes.Reference Reference} to the remote storage file.
   */
  task: FirebaseStorageTypes.Task;

}

/**
 * File upload return result.
 */
export interface UploadResult extends RefTask {

  /**
   * A promise that resolves when the upload operation completes.
   *
   * @param onFulfilled The callback function that is called when the upload operation completes.
   * @param onRejected The callback function that is called when the upload operation fails.
   * @returns A promise that resolves to this {@link UploadResult} when the operation completes.
   */
  then: (
    onFulfilled?: (refTask: RefTask) => any,
    onRejected?: (error: ReactNativeFirebase.NativeFirebaseError) => any
  ) => Promise<any>;

}
