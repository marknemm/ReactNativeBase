import Input from '@components/input/Input';
import { PHONE_PATTERN_RULE } from '@constants/validation';
import { Masks } from 'react-native-mask-input';

/**
 * The {@link PhoneInput} component.
 *
 * @param {Types.Input.PhoneInputProps} props The component {@link Types.Input.PhoneInputProps properties}.
 * @returns {React.JSX.Element} The {@link PhoneInput} component.
 */
export default function PhoneInput(props) {
  return (
    <Input
      autoCapitalize="none"
      autoComplete="tel"
      autoCorrect={false}
      keyboardType="phone-pad"
      mask={Masks.USA_PHONE}
      pattern={PHONE_PATTERN_RULE}
      textContentType="telephoneNumber"
      {...props}
    />
  );
}
