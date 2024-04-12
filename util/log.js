/* eslint-disable no-console */

let showDebugLogs = __DEV__;

/**
 * Logs a debug message to the console.
 *
 * @param {...any} message The debug message(s) to log.
 */
export function log(...message) {
  if (!showDebugLogs) return;
  console.debug(message);
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
  console.error(message);
}

/**
 * Sets the `showDebugLogs` flag.
 *
 * @param {boolean} visible `true` if debug log messages shall be shown, `false` if not.
 */
export function setShowDebugLogs(visible) {
  showDebugLogs = visible;
}
