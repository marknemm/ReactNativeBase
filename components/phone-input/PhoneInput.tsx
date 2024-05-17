import Input from '@components/input/Input';
import { PHONE_PATTERN_RULE } from '@constants/validation';
import { forwardRef } from 'react';
import { Masks } from 'react-native-mask-input';
import { PhoneInputFC, Props } from './props';

/**
 * An {@link Input} field for entering a phone number.
 *
 * @param props The component {@link Props}.
 * @param ref The component reference.
 * @returns The {@link PhoneInput} component.
 */
const PhoneInput: PhoneInputFC = forwardRef((props, ref) => (
  <Input
    autoCapitalize="none"
    autoComplete="tel"
    autoCorrect={false}
    keyboardType="phone-pad"
    mask={Masks.USA_PHONE}
    pattern={PHONE_PATTERN_RULE}
    ref={ref}
    textContentType="telephoneNumber"
    {...props}
  />
));

export default PhoneInput;
