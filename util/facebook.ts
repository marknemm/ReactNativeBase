import { GraphRequest, GraphRequestCallback, GraphRequestConfig, GraphRequestManager, Profile } from 'react-native-fbsdk-next';

/**
 * The {@link GraphRequestManager}.
 */
const graphReqMgr = new GraphRequestManager();

/**
 * Gets the Facebook {@link Profile} for the currently authenticated user.
 *
 * @param callback {@link GraphRequestCallback} to invoke when the request completes.
 * @returns A promise that resolves to the Facebook {@link Profile} when the request completes.
 */
export async function getFBProfile(callback?: GraphRequestCallback): Promise<Profile> {
  return queryFBGraph('/me', null, callback);
}

/**
 * Gets the Facebook email for the currently authenticated user.
 *
 * @param callback {@link GraphRequestCallback} to invoke when the request completes.
 * @returns A promise that resolves to the Facebook email when the request completes.
 */
export async function getFBEmail(callback?: GraphRequestCallback): Promise<string> {
  const wrappedCallback = callback
    ? (cbError: any, cbResult: any) => callback(cbError, cbResult?.email ?? null)
    : undefined;

  const result = await queryFBGraph('/me', { parameters: { fields: { string: 'email' } } }, wrappedCallback);
  return result?.email;
}

/**
 * Queries the Facebook Graph API with the given path and configuration for the currently authenticated user.
 *
 * @param graphPath The path to query on the Facebook Graph API.
 * @param config The configuration for the request.
 * @param callback {@link GraphRequestCallback} to invoke when the request completes.
 * @returns {Promise<any>} A promise that resolves to the result of the request when it completes.
 */
export async function queryFBGraph(
  graphPath: string,
  config: GraphRequestConfig = {},
  callback?: GraphRequestCallback
): Promise<any> {
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
