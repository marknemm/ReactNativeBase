import Input from '@components/input/Input';
import { EMAIL_PATTERN_RULE } from '@constants/validation';
import { forwardRef } from 'react';
import type { EmailInputFC, EmailInputProps } from './EmailInput.interfaces';

/**
 * An {@link Input} field for entering an email address.
 *
 * @param props The component {@link EmailInputProps}.
 * @param ref The component reference.
 * @returns The {@link EmailInput} component.
 */
const EmailInput: EmailInputFC = forwardRef((props, ref) => (
  <Input
    autoCapitalize="none"
    autoComplete="email"
    autoCorrect={false}
    keyboardType="email-address"
    pattern={EMAIL_PATTERN_RULE}
    ref={ref}
    textContentType="emailAddress"
    {...props}
  />
));

export type * from './EmailInput.interfaces';
export default EmailInput;
