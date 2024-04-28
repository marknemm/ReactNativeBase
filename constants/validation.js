import { EMAIL_REGEX, PHONE_REGEX } from '@constants/regex';

/**
 * The default email pattern {@link Types.Form.ValidationRule ValidationRule}.
 *
 * @type {Types.Form.ValidationRule<RegExp>}
 */
export const EMAIL_PATTERN_RULE = {
  value: EMAIL_REGEX,
  message: 'Invalid email address',
};

/**
 * The minimum password length.
 */
export const PASSWORD_MIN_LENGTH = 6;

/**
 * The default password minimum length {@link Types.Form.ValidationRule ValidationRule}.
 *
 * @type {Types.Form.ValidationRule<number>}
 */
export const PASSWORD_MIN_LENGTH_RULE = {
  value: PASSWORD_MIN_LENGTH,
  message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
};

/**
 * The default phone pattern {@link Types.Form.ValidationRule ValidationRule}.
 *
 * @type {Types.Form.ValidationRule<RegExp>}
 */
export const PHONE_PATTERN_RULE = {
  value: PHONE_REGEX,
  message: 'Invalid phone number',
};
