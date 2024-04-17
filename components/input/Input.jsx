/* eslint-disable react/destructuring-assignment */
import { useFormControl, useFormErrorMessage } from '@hooks/form-field-hooks';
import { Input as RneInput, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

/**
 * The input component.
 *
 * @param {Types.Input.InputProps} props The component {@link Types.Input.InputProps properties}.
 * @returns {React.JSX.Element} The input component.
 * @throws {Error} The name property is required when using form controls.
 */
export default function Input(props) {
  const { theme } = useTheme();
  const [uiValue, setUiValue] = useState('');
  const control = useFormControl(props);
  const errorMessage = useFormErrorMessage(props);
  const inputRef = useRef(null);

  const { value } = props;
  delete props.value; // Do not pass the value prop to the input component to prevent performance lag.

  useEffect(() => {
    // Sync value prop with input (UI) value. Done manually to prevent change on each keystroke and prevent lag.
    if (value !== undefined && value !== uiValue) {
      inputRef.current?.setNativeProps({ text: value });
    }
  }, [uiValue, value]);

  return control
    ? (
      <Controller
        control={control}
        name={props.name}
        render={({ field: { onChange, onBlur, value: formValue } }) => {
          // Sync form value with input (UI) value. Done manually to prevent change on each keystroke and prevent lag.
          if (formValue != null && formValue !== uiValue) {
            setTimeout(() => inputRef.current?.setNativeProps({ text: formValue }));
          }

          return (
            <RneInput
              errorMessage={errorMessage}
              keyboardAppearance={theme.mode}
              {...props}
              onBlur={(event) => {
                onBlur();
                props.onBlur?.(event);
              }}
              onChangeText={(text) => {
                onChange(text);
                props.onChangeText?.(text);
                setUiValue(text);
              }}
              ref={inputRef}
            />
          );
        }}
        rules={props.rules}
      />
    )
    : (
      <RneInput
        {...props}
        ref={inputRef}
      />
    );
}

Input.propTypes = {
  control: PropTypes.object,
  errorMsg: PropTypes.string,
  errors: PropTypes.object,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  rules: PropTypes.object,
  value: PropTypes.string,
};
