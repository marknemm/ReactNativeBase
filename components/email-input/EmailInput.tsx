import Input from '@components/input/Input';
import { EMAIL_PATTERN_RULE } from '@constants/validation';
import { forwardRef } from 'react';
import { EmailInputFC, Props } from './props';

/**
 * An {@link Input} field for entering an email address.
 *
 * @param props The component {@link Props}.
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

export default EmailInput;
