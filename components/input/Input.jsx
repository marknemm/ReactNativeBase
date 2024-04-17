import { useFormControl, useFormErrorMessage } from '@hooks/form-field-hooks';
import { Input as RneInput, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

/**
 * The {@link Input} component.
 *
 * @param {Types.Input.InputProps} props The component {@link Types.Input.InputProps properties}.
 * @returns {React.JSX.Element} The {@link Input} component.
 * @throws {Error} The `name` property is required when using form controls.
 */
export default function Input(props) {
  const { name, onBlur, onChangeText, rules } = props;
  const control = useFormControl(props);

  return control
    ? (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange: onChangeForm, onBlur: onBlurForm, value } }) => (
          <InputControlled
            {...props}
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
  const { onChangeText, value } = props;
  const { theme } = useTheme();
  const [uiValue, setUiValue] = useState('');
  const errorMessage = useFormErrorMessage(props);
  const inputRef = useRef(null);

  useEffect(() => {
    // Sync value prop with input (UI) value. Done manually to prevent change on each keystroke and prevent lag.
    if (value !== undefined && value !== uiValue) {
      inputRef.current?.setNativeProps({ text: value });
    }
  }, [uiValue, value]);

  return (
    <RneInput
      errorMessage={errorMessage}
      keyboardAppearance={theme.mode}
      {...props}
      onChangeText={(text) => {
        onChangeText?.(text);
        setUiValue(text);
      }}
      ref={inputRef}
      value={undefined} // Do not update value prop directly to prevent input lag (see useEffect above).
    />
  );
}

Input.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  rules: PropTypes.object,
};

InputControlled.propTypes = {
  control: PropTypes.object,
  errorMsg: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};
