import Input from '@components/input/Input';
import { PASSWORD_MIN_LENGTH_RULE } from '@constants/validation';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

/**
 * The {@link PasswordInput} component.
 *
 * @param {Types.Input.PasswordInputProps} props The component {@link Types.Input.PasswordInputProps properties}.
 * @returns {React.JSX.Element} The {@link PasswordInput} component.
 */
export default function PasswordInput(props) {
  const { autoComplete, isVisibilityToggleEnabled = true, textContentType } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const derivedAutoComplete = autoComplete
    ?? (textContentType === 'password')
    ? 'current-password'
    : 'new-password';

  const derivedTextContentType = textContentType
    ?? (autoComplete === 'current-password')
    ? 'password'
    : 'newPassword';

  const passwordVisibleIcon = useMemo(
    () => (isVisibilityToggleEnabled
      ? {
        color: passwordVisible ? 'green' : 'gray',
        name: passwordVisible ? 'eye' : 'eye-off',
        type: 'feather',
        style: { padding: 7 },
        onPress: () => setPasswordVisible(!passwordVisible),
      }
      : undefined
    ),
    [isVisibilityToggleEnabled, passwordVisible]
  );

  return (
    <Input
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete={derivedAutoComplete}
      keyboardType={passwordVisible ? 'default' : 'visible-password'}
      minLength={PASSWORD_MIN_LENGTH_RULE}
      secureTextEntry={!passwordVisible}
      textContentType={derivedTextContentType}
      rightIcon={passwordVisibleIcon}
      {...props}
    />
  );
}

PasswordInput.propTypes = {
  autoComplete: PropTypes.string,
  isVisibilityToggleEnabled: PropTypes.bool,
  rules: PropTypes.object,
  textContentType: PropTypes.string,
};
