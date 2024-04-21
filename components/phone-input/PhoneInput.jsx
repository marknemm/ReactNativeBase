import Input from '@components/input/Input';
import { PHONE_REGEX } from '@constants/regex';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

/**
 * The {@link PhoneInput} component.
 *
 * @param {Types.Input.PhoneInputProps} props The component {@link Types.Input.PhoneInputProps properties}.
 * @returns {React.JSX.Element} The {@link PhoneInput} component.
 */
export default function PhoneInput(props) {
  const { label, required, rules, rulesErrorMessageMap } = props;

  const derivedRules = useMemo(
    () => (rules
      ? {
        pattern: PHONE_REGEX, // Always include the phone regex pattern rule
        ...rules,
      }
      : {
        pattern: PHONE_REGEX,
        required: (typeof required === 'string')
          ? required
          : required
            ? `${label || 'Phone number'} is required`
            : undefined,
      }
    ),
    [label, required, rules]
  );

  const derivedRulesErrorMessageMap = useMemo(
    () => ({
      pattern: 'Invalid phone number',
      ...rulesErrorMessageMap,
    }),
    [rulesErrorMessageMap]
  );

  return (
    <Input
      autoCapitalize="none"
      autoComplete="tel"
      autoCorrect={false}
      keyboardType="phone-pad"
      textContentType="telephoneNumber"
      {...props}
      rules={derivedRules}
      rulesErrorMessageMap={derivedRulesErrorMessageMap}
    />
  );
}

PhoneInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.object,
  rulesErrorMessageMap: PropTypes.object,
};
