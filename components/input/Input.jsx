import { useFormControl, useFormErrorMessage } from '@hooks/form-hooks';
import { Input as RneInput, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

/**
 * The {@link Input} component.
 *
 * @param {Types.Input.InputProps} props The component {@link Types.Input.InputProps properties}.
 * @returns {React.JSX.Element} The {@link Input} component.
 * @throws {Error} The `name` property is required when using form controls.
 */
export default function Input(props) {
  const { label, minLength, name, onBlur, onChangeText, required, rules, rulesErrorMessageMap } = props;
  const control = useFormControl(props);

  const derivedRules = useMemo(
    () => rules ?? {
      minLength,
      required: (typeof required === 'string')
        ? required
        : required
          ? `${label || 'Field'} is required`
          : undefined,
    },
    [label, minLength, required, rules]
  );

  const derivedRulesErrorMessageMap = useMemo(
    () => (rules
      ? rulesErrorMessageMap
      : {
        minLength: minLength
          ? `${label ?? 'Field'} must be at least ${minLength} characters`
          : undefined,
        ...rulesErrorMessageMap,
      }
    ),
    [label, minLength, rules, rulesErrorMessageMap]
  );

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
            rulesErrorMessageMap={derivedRulesErrorMessageMap}
            value={value}
          />
        )}
        rules={derivedRules}
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
  label: PropTypes.string,
  minLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  required: PropTypes.bool,
  rules: PropTypes.object,
  rulesErrorMessageMap: PropTypes.object,
};

InputControlled.propTypes = {
  control: PropTypes.object,
  errorMsg: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};
