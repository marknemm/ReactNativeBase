import { useFormControl, useFormErrorMessage, useValidationRules } from '@hooks/form-hooks';
import { Input as RneInput, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useMaskedInputProps } from 'react-native-mask-input';

/**
 * The {@link Input} component.
 *
 * @param {Types.Input.InputProps} props The component {@link Types.Input.InputProps properties}.
 * @returns {React.JSX.Element} The {@link Input} component.
 * @throws {Error} The `name` property is required when using form controls.
 */
export default function Input(props) {
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
 * The {@link InputControlled} component.
 *
 * @param {Types.Input.InputProps} props The component {@link Types.Input.InputProps properties}.
 * @returns {React.JSX.Element} The {@link InputControlled} component.
 */
function InputControlled(props) {
  const { mask, maxLength, maxLengthLimitTyping, onChangeText, value } = props;
  const { theme } = useTheme();
  const [uiValue, setUiValue] = useState('');
  const inputRef = useRef(null);

  const maskedInputProps = useMaskedInputProps({ mask, onChangeText, value });

  const maxLengthNum = (typeof maxLength === 'number')
    ? maxLength
    : maxLength?.value;

  useEffect(() => {
    // Sync value prop with input (UI) value. Done manually to prevent change on each keystroke and prevent lag.
    if (maskedInputProps.value !== undefined && maskedInputProps.value !== uiValue) {
      inputRef.current?.setNativeProps({ text: maskedInputProps.value });
    }
  }, [maskedInputProps.value, uiValue]);

  return (
    <RneInput
      keyboardAppearance={theme.mode}
      {...props}
      {...maskedInputProps}
      maxLength={maxLengthLimitTyping ? maxLengthNum : undefined}
      onChangeText={useCallback((text) => {
        maskedInputProps.onChangeText?.(text);
        setUiValue(text);
      }, [maskedInputProps])}
      ref={inputRef}
      value={undefined} // Do not update value prop directly to prevent input lag (see useEffect above).
    />
  );
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
};

InputControlled.propTypes = {
  mask: PropTypes.any,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  maxLengthLimitTyping: PropTypes.bool,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};
