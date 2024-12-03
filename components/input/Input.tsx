import { useFormControl, useFormErrorMessage, useValidationRules } from '@hooks/form-hooks';
import { useCallbacks } from '@hooks/state-hooks';
import { Input as RneInput, useTheme } from '@rneui/themed';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useMaskedInputProps } from 'react-native-mask-input';
import type { InputFC, InputProps, InputRefType } from './Input.interfaces';
import { useStyles } from './Input.styles';

/**
 * Component for generic user text input.
 *
 * @param props The component {@link InputProps}.
 * @param ref The component reference.
 * @returns The {@link Input} component.
 */
const Input: InputFC = forwardRef((props, ref) => {
  const { label, name, onBlur, onChangeText } = props;

  // Derive entities related to an input controlled by react-hook-form
  const control = useFormControl(props);
  const rules = useValidationRules(props, label?.toString());
  const errorMessage = useFormErrorMessage(rules, props);

  return control
    ? (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange: onChangeForm, onBlur: onBlurForm, value } }) => (
          <InputControlled
            {...props}
            errorMessage={errorMessage}
            onBlur={(event) => {
              onBlurForm();
              onBlur?.(event);
            }}
            onChangeText={(text) => {
              onChangeForm(text);
              onChangeText?.(text);
            }}
            ref={ref}
            value={value}
          />
        )}
        rules={rules}
      />
    )
    : <InputControlled {...props} ref={ref} />;
});

/**
 * Controlled {@link Input} component.
 *
 * @param props The component {@link InputProps}.
 * @param ref The component reference.
 * @returns The {@link InputControlled} component.
 */
const InputControlled: InputFC = forwardRef(({
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  mask,
  maxLength,
  maxLengthLimitTyping,
  onChangeText,
  style,
  value,
  ...inputProps
}, ref) => {
  const styles = useStyles({ containerStyle, inputContainerStyle, inputStyle, labelStyle, style });
  const { theme } = useTheme();
  const [uiValue, setUiValue] = useState('');
  const inputRef = useRef<InputRefType>();
  ref ??= inputRef;

  const maskedInputProps = useMaskedInputProps({ mask, onChangeText, value });
  if (mask) {
    onChangeText = maskedInputProps.onChangeText;
    value = maskedInputProps.value;
  }

  const maxLengthNum = (typeof maxLength === 'number')
    ? maxLength
    : maxLength?.value ?? undefined;

  useEffect(() => {
    // Sync value prop with input (UI) value. Done manually to prevent change on each keystroke and prevent lag.
    if (value !== undefined && value !== uiValue) {
      const textInput = (ref as React.MutableRefObject<InputRefType>).current;
      textInput?.setNativeProps({ text: value });
    }
  }, [ref, value, uiValue]);

  return (
    <RneInput
      keyboardAppearance={theme.mode}
      placeholderTextColor={theme.colors.placeholder}
      {...inputProps}
      {...(mask ? maskedInputProps : undefined)}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      labelStyle={styles.label}
      maxLength={maxLengthLimitTyping ? maxLengthNum : undefined}
      onChangeText={useCallbacks(onChangeText, setUiValue)}
      ref={ref}
      style={styles.style}
      value={undefined} // Do not update value prop directly to prevent input lag (see useEffect above).
    />
  );
});

export type * from './Input.interfaces';
export default Input;
