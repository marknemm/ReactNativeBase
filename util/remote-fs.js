import storage from '@react-native-firebase/storage';

/**
 * Saves a local file to the remote file system.
 *
 * @param {string} localPath The slash-separated path to the local file.
 * @param {string} remotePath The slash-separated path to the remote file.
 * @returns {Types.RemoteFS.UploadResult} The {@link Types.RemoteFS.UploadResult UploadResult}.
 */
export function uploadFile(localPath, remotePath) {
  const ref = storage().ref(remotePath);
  const task = ref.putFile(localPath);

  return {
    ref,
    task,
    then: (onFulfilled, onRejected) => task.then(onFulfilled.bind(task, { ref, task }), onRejected),
  };
}
