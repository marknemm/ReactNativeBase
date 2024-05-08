import Input from '@components/input/Input';
import { EMAIL_PATTERN_RULE } from '@constants/validation';
import { Props } from './props';

/**
 * An {@link Input} field for entering an email address.
 *
 * @param props The component {@link Props}.
 * @returns The {@link EmailInput} component.
 */
const EmailInput: React.FC<Props> = (props) => (
  <Input
    autoCapitalize="none"
    autoComplete="email"
    autoCorrect={false}
    keyboardType="email-address"
    pattern={EMAIL_PATTERN_RULE}
    textContentType="emailAddress"
    {...props}
  />
);

export default EmailInput;
