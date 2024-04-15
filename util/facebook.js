import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

const graphReqMgr = new GraphRequestManager();

/**
 * Gets the Facebook profile for the currently authenticated user.
 *
 * @param {import('react-native-fbsdk-next').GraphRequestCallback} [callback] Callback function to invoke when the request completes.
 * @returns {Promise<import('react-native-fbsdk-next').Profile>} A promise that resolves to the Facebook profile when the request completes.
 */
export async function getFBProfile(callback) {
  return queryFBGraph('/me', null, callback);
}

/**
 * Gets the Facebook email for the currently authenticated user.
 *
 * @param {import('react-native-fbsdk-next').GraphRequestCallback} [callback] Callback function to invoke when the request completes.
 * @returns {Promise<string>} A promise that resolves to the Facebook email when the request completes.
 */
export async function getFBEmail(callback) {
  const wrappedCallback = callback
    ? (cbError, cbResult) => callback(cbError, cbResult?.email ?? null)
    : undefined;

  const result = await queryFBGraph('/me', { parameters: { fields: { string: 'email' } } }, wrappedCallback);
  return result?.email;
}

/**
 * Queries the Facebook Graph API with the given path and configuration for the currently authenticated user.
 *
 * @param {string} graphPath The path to query on the Facebook Graph API.
 * @param {import('react-native-fbsdk-next').GraphRequestConfig} config The configuration for the request.
 * @param {import('react-native-fbsdk-next').GraphRequestCallback} [callback] Callback function to invoke when the request completes.
 * @returns {Promise<any>} A promise that resolves to the result of the request when it completes.
 */
export async function queryFBGraph(graphPath, config, callback) {
  return new Promise((resolve, reject) => {
    const graphReq = new GraphRequest(graphPath, config, (error, result) => {
      (!callback && error)
        ? reject(error)
        : resolve(result);
      callback?.(error, result);
    });
    graphReqMgr.addRequest(graphReq).start();
  });
}
