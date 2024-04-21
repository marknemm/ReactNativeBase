import Input from '@components/input/Input';
import { EMAIL_REGEX } from '@constants/regex';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

/**
 * The {@link EmailInput} component.
 *
 * @param {Types.Input.EmailInputProps} props The component {@link Types.Input.EmailInputProps properties}.
 * @returns {React.JSX.Element} The {@link EmailInput} component.
 */
export default function EmailInput(props) {
  const { label, required, rules, rulesErrorMessageMap } = props;

  const derivedRules = useMemo(
    () => (rules
      ? {
        pattern: EMAIL_REGEX, // Always include the email regex pattern rule
        ...rules,
      }
      : {
        pattern: EMAIL_REGEX,
        required: (typeof required === 'string')
          ? required
          : required
            ? `${label || 'Email'} is required`
            : undefined,
      }
    ),
    [label, required, rules]
  );

  const derivedRulesErrorMessageMap = useMemo(
    () => ({
      pattern: 'Invalid email address',
      ...rulesErrorMessageMap,
    }),
    [rulesErrorMessageMap]
  );

  return (
    <Input
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect={false}
      keyboardType="email-address"
      textContentType="emailAddress"
      {...props}
      rules={derivedRules}
      rulesErrorMessageMap={derivedRulesErrorMessageMap}
    />
  );
}

EmailInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.object,
  rulesErrorMessageMap: PropTypes.object,
};
