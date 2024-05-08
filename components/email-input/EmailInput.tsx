import Input from '@components/input/Input';
import { EMAIL_PATTERN_RULE } from '@constants/validation';
import { Props } from './props';

/**
 * An {@link Input} field for entering an email address.
 */
const EmailInput: React.FC<Props> = (props) => {
  return (
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
}

export default EmailInput;
