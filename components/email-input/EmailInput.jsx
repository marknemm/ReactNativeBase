import Input from '@components/input/Input';
import { EMAIL_PATTERN_RULE } from '@constants/validation';

/**
 * The {@link EmailInput} component.
 *
 * @param {Types.Input.EmailInputProps} props The component {@link Types.Input.EmailInputProps properties}.
 * @returns {React.JSX.Element} The {@link EmailInput} component.
 */
export default function EmailInput(props) {
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
