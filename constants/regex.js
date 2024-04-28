/**
 * Regular expression for email validation.
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Regular expression for phone number validation.
 */
export const PHONE_REGEX = /^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

/**
 * Regular expression for positive whole number validation.
 */
export const POSITIVE_WHOLE_NUMBER_REGEX = /^\d+$/;

/**
 * Regular expression for positive decimal number validation.
 */
export const POSITIVE_DECIMAL_REGEX = /^\d*(\.\d+)?$/;
