import { EMAIL_REGEX, PHONE_REGEX } from '@constants/regex';
import { ValidationRule } from 'react-hook-form';

/**
 * The default email pattern {@link ValidationRule}.
 */
export const EMAIL_PATTERN_RULE: ValidationRule<RegExp> = {
  value: EMAIL_REGEX,
  message: 'Invalid email address',
};

/**
 * The minimum password length.
 */
export const PASSWORD_MIN_LENGTH = 6;

/**
 * The default password minimum length {@link ValidationRule}.
 */
export const PASSWORD_MIN_LENGTH_RULE: ValidationRule<number> = {
  value: PASSWORD_MIN_LENGTH,
  message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
};

/**
 * The default phone pattern {@link ValidationRule}.
 */
export const PHONE_PATTERN_RULE: ValidationRule<RegExp> = {
  value: PHONE_REGEX,
  message: 'Invalid phone number',
};
