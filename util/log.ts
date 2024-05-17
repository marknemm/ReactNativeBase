/* eslint-disable no-console */
import { configure } from 'safe-stable-stringify';

const stringify = configure({ maximumDepth: 5 });
let showDebugLogs: boolean = __DEV__;

/**
 * Logs a debug message to the console.
 *
 * @param message The debug message(s) to log.
 */
export function log(...message: any[]) {
  if (!showDebugLogs) return;
  console.debug(...beautify(message));
}

/**
 * Logs the environment variables to the console.
 */
export function logEnv() {
  const env = require('@env'); // eslint-disable-line global-require, @typescript-eslint/no-var-requires
  for (const envVar in env) {
    if (typeof env[envVar] !== 'function') {
      log(envVar, env[envVar]);
    }
  }
}

/**
 * Logs an error message to the console.
 *
 * @param message The error message(s) to log.
 */
export function logErr(...message: any[]) {
  console.error(message);
}

/**
 * Logs an error message to the console and throws the given {@link Error}.
 *
 * @param error The {@link Error} to log and throw.
 * @throws The given {@link Error}.
 */
export function logThrowErr(error: any) {
  logErr(error);
  throw error;
}

/**
 * Sets the `showDebugLogs` flag.
 *
 * @param visible `true` if debug log messages shall be shown, `false` if not.
 */
export function setShowDebugLogs(visible: boolean) {
  showDebugLogs = visible;
}

/**
 * Beautifies the given message(s) for logging.
 *
 * @param message The message(s) to beautify.
 * @returns A list containing the beautified message(s).
 */
function beautify(...message: any[]): string[] {
  return message.map((msg) => (
    (typeof msg === 'object')
      ? stringify(msg, undefined, 2)
        .replace(/"([^"]+)":/g, '$1:') // Remove quotes from object keys
        .replace(/^\[|\]$/g, '')       // Remove square brackets surrounding object
      : msg
  ));
}
