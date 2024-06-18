import Input from '@components/input/Input';
import { PASSWORD_MIN_LENGTH_RULE } from '@constants/validation';
import type { IconNode } from '@rneui/base';
import { forwardRef, useMemo, useState } from 'react';
import type { PasswordInputFC, PasswordInputProps } from './PasswordInput.interfaces';

/**
 * An {@link Input} field for entering a password.
 *
 * @param props The component {@link PasswordInputProps}.
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
        accessibilityLabel: 'Toggle password visibility',
        color: passwordVisible ? 'green' : 'gray',
        name: passwordVisible ? 'eye' : 'eye-off',
        type: 'feather',
        style: { padding: 7 },
        onPress: () => setPasswordVisible(!passwordVisible),
      } as IconNode
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

export type * from './PasswordInput.interfaces';
export default PasswordInput;
