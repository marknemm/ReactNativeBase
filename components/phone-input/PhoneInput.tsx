import Input from '@components/input/Input';
import { PHONE_PATTERN_RULE } from '@constants/validation';
import { Masks } from 'react-native-mask-input';
import { Props } from './props';

/**
 * An {@link Input} field for entering a phone number.
 */
const PhoneInput: React.FC<Props> = (props) => {
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

export default PhoneInput;
