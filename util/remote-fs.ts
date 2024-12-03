import { UploadResult } from '@interfaces/remote-fs';
import storage from '@react-native-firebase/storage';

export { UploadResult };

/**
 * Saves a local file to the remote file system.
 *
 * @param localPath The slash-separated path to the local file.
 * @param remotePath The slash-separated path to the remote file.
 * @returns The {@link Types.RemoteFS.UploadResult UploadResult}.
 */
export function uploadFile(localPath: string, remotePath: string): UploadResult {
  const ref = storage().ref(remotePath);
  const task = ref.putFile(localPath);

  return {
    ref,
    task,
    then: (onFulfilled, onRejected) => task.then(onFulfilled.bind(task, { ref, task }), onRejected),
  };
}
