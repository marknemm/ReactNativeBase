import { useFormControl, useFormErrorMessage, useValidationRules } from '@hooks/form-hooks';
import { Input as RneInput, useTheme } from '@rneui/themed';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useMaskedInputProps } from 'react-native-mask-input';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * Component for generic user text input.
 */
const Input: React.FC<Props> = (props) => {
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
            value={value}
          />
        )}
        rules={rules}
      />
    )
    : <InputControlled {...props} />;
}

/**
 * Controlled {@link Input} component.
 */
const InputControlled: React.FC<Props> = ({
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
}) => {
  const styles = useStyles({ containerStyle, inputContainerStyle, inputStyle, labelStyle, style });
  const { theme } = useTheme();
  const [uiValue, setUiValue] = useState('');
  const inputRef = useRef(null);

  const maskedInputProps = useMaskedInputProps({ mask, onChangeText, value });
  if (mask) {
    onChangeText = maskedInputProps.onChangeText;
    value = maskedInputProps.value;
  }

  const maxLengthNum = (typeof maxLength === 'number')
    ? maxLength
    : maxLength?.value;

  useEffect(() => {
    // Sync value prop with input (UI) value. Done manually to prevent change on each keystroke and prevent lag.
    if (value !== undefined && value !== uiValue) {
      inputRef.current?.setNativeProps({ text: value });
    }
  }, [value, uiValue]);

  return (
    <RneInput
      keyboardAppearance={theme.mode}
      placeholderTextColor={theme.colors.placeholder}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      labelStyle={styles.label}
      style={styles.style}
      {...inputProps}
      {...(mask ? maskedInputProps : undefined)}
      maxLength={maxLengthLimitTyping ? maxLengthNum : undefined}
      onChangeText={useCallback((text) => {
        onChangeText?.(text);
        setUiValue(text);
      }, [onChangeText])}
      ref={inputRef}
      value={undefined} // Do not update value prop directly to prevent input lag (see useEffect above).
    />
  );
}

export default Input;
