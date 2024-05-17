import Input from '@components/input/Input';
import { PASSWORD_MIN_LENGTH_RULE } from '@constants/validation';
import { forwardRef, useMemo, useState } from 'react';
import { PasswordInputFC, Props } from './props';

/**
 * An {@link Input} field for entering a password.
 *
 * @param props The component {@link Props}.
 * @param ref The component reference.
 * @returns The {@link PasswordInput} component.
 */
const PasswordInput: PasswordInputFC = forwardRef((props, ref) => {
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
      ref={ref}
      rightIcon={passwordVisibleIcon}
      {...props}
    />
  );
});

export default PasswordInput;
