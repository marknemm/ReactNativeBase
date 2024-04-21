import Input from '@components/input/Input';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

/**
 * The {@link PasswordInput} component.
 *
 * @param {Types.Input.PasswordInputProps} props The component {@link Types.Input.PasswordInputProps properties}.
 * @returns {React.JSX.Element} The {@link PasswordInput} component.
 */
export default function PasswordInput(props) {
  const {
    autoComplete, enablePasswordVisibilityToggle = true, label,
    minLength = 6, required, rules, rulesErrorMessageMap, textContentType,
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const derivedAutoComplete = autoComplete
    ?? (textContentType === 'password')
    ? 'current-password'
    : 'new-password';

  const derivedTextContentType = textContentType
    ?? (autoComplete === 'current-password')
    ? 'password'
    : 'newPassword';

  const derivedRules = useMemo(
    () => rules ?? {
      minLength,
      required: (typeof required === 'string')
        ? required
        : required
          ? `${label || 'Password'} is required`
          : undefined,
    },
    [label, minLength, required, rules]
  );

  const derivedRulesErrorMessageMap = useMemo(
    () => (rules
      ? rulesErrorMessageMap
      : {
        minLength: `${label ?? 'Password'} must be at least ${minLength} characters`,
        ...rulesErrorMessageMap,
      }
    ),
    [label, minLength, rules, rulesErrorMessageMap]
  );

  const passwordVisibleIcon = useMemo(
    () => (enablePasswordVisibilityToggle
      ? {
        color: passwordVisible ? 'green' : 'gray',
        name: passwordVisible ? 'eye' : 'eye-off',
        type: 'feather',
        style: { padding: 7 },
        onPress: () => setPasswordVisible(!passwordVisible),
      }
      : undefined
    ),
    [enablePasswordVisibilityToggle, passwordVisible]
  );

  return (
    <Input
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete={derivedAutoComplete}
      keyboardType={passwordVisible ? 'default' : 'visible-password'}
      secureTextEntry={!passwordVisible}
      textContentType={derivedTextContentType}
      rightIcon={passwordVisibleIcon}
      {...props}
      rules={derivedRules}
      rulesErrorMessageMap={derivedRulesErrorMessageMap}
    />
  );
}

PasswordInput.propTypes = {
  autoComplete: PropTypes.string,
  enablePasswordVisibilityToggle: PropTypes.bool,
  label: PropTypes.string,
  minLength: PropTypes.number,
  required: PropTypes.bool,
  rules: PropTypes.object,
  rulesErrorMessageMap: PropTypes.object,
  textContentType: PropTypes.string,
};
