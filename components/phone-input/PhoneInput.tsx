import Input from '@components/input/Input';
import { PHONE_PATTERN_RULE } from '@constants/validation';
import { forwardRef } from 'react';
import { Masks } from 'react-native-mask-input';
import type { PhoneInputFC, PhoneInputProps } from './PhoneInput.interfaces';

/**
 * An {@link Input} field for entering a phone number.
 *
 * @param props The component {@link PhoneInputProps}.
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

export type * from './PhoneInput.interfaces';
export default PhoneInput;
