/* eslint-disable no-console */

let dev = true;

/**
 * Logs a debug message to the console.
 *
 * @param {...any} message The debug message(s) to log.
 */
export function log(...message) {
  if (!dev) return;
  console.debug(message);
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
 * Sets the dev mode for the log.
 *
 * @param {boolean} isDev `true` if dev mode, `false` if not.
 */
export function setDev(isDev) {
  dev = isDev;
}
