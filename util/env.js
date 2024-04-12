/**
 * The Firebase Emulator host.
 */
export const FIREBASE_EMU_HOST = process.env.EXPO_PUBLIC_FIREBASE_EMU_HOST || 'localhost';

/**
 * The Firebase Emulator Auth port.
 */
export const FIREBASE_EMU_AUTH_PORT = parseInt(process.env.EXPO_PUBLIC_FIREBASE_EMU_AUTH_PORT) ?? 9099;

/**
 * The Firebase Emulator Firestore port.
 */
export const FIREBASE_EMU_FIRESTORE_PORT = parseInt(process.env.EXPO_PUBLIC_FIREBASE_EMU_FIRESTORE_PORT) ?? 8080;

/**
 * The Firebase Emulator Functions port.
 */
export const FIREBASE_EMU_FUNCTIONS_PORT = parseInt(process.env.EXPO_PUBLIC_FIREBASE_EMU_FUNCTIONS_PORT) ?? 5001;

/**
 * The Firebase Emulator Storage port.
 */
export const FIREBASE_EMU_STORAGE_PORT = parseInt(process.env.EXPO_PUBLIC_FIREBASE_EMU_STORAGE_PORT) ?? 9199;

/**
 * Parse a string to a number.
 *
 * @param {string} value The string to parse.
 * @param {number} [radix=10] The radix to use when parsing the string.
 * @returns {number} The parsed number or `null` if the value is falsy.
 */
function parseInt(value, radix = 10) {
  return value ? Number.parseInt(value, radix) : null;
}
