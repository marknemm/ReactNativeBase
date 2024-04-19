/* eslint-disable no-console */

let showDebugLogs = __DEV__;

/**
 * Logs a debug message to the console.
 *
 * @param {...any} message The debug message(s) to log.
 */
export function log(...message) {
  if (!showDebugLogs) return;
  console.debug(...beautify(message));
}

/**
 * Logs the environment variables to the console.
 */
export function logEnv() {
  // eslint-disable-next-line global-require
  const env = require('@env');
  for (const envVar in env) {
    if (typeof env[envVar] !== 'function') {
      log(envVar, env[envVar]);
    }
  }
}

/**
 * Logs an error message to the console.
 *
 * @param  {...any} message The error message(s) to log.
 */
export function logErr(...message) {
  console.error(...beautify(message));
}

/**
 * Logs an error message to the console and throws the given error.
 *
 * @param {any} error The error to log and throw.
 * @throws {Error} The given error.
 */
export function logThrowErr(error) {
  logErr(error);
  throw error;
}

/**
 * Sets the `showDebugLogs` flag.
 *
 * @param {boolean} visible `true` if debug log messages shall be shown, `false` if not.
 */
export function setShowDebugLogs(visible) {
  showDebugLogs = visible;
}

/**
 * Beautifies the given message(s) for logging.
 *
 * @param  {...any} message The message(s) to beautify.
 * @returns {string[]} A list containing the beautified message(s).
 */
function beautify(...message) {
  return message.map((msg) => (
    (typeof msg === 'object')
      ? JSON.stringify(msg, undefined, 2)
        .replace(/"([^"]+)":/g, '$1:') // Remove quotes from object keys
        .replace(/^\[|\]$/g, '')       // Remove square brackets surrounding object
      : msg
  ));
}
