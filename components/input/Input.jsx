/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { useFormControl, useFormErrorMessage } from '@hooks/form-field-hooks';
import { Input as RneInput, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

/**
 * The input component.
 *
 * @param {import('@typedefs/input').InputProps} props The component properties.
 * @returns {React.JSX.Element} The input component.
 * @throws {Error} The name property is required when using form controls.
 */
export default function Input(props) {
  const { theme } = useTheme();
  const control = useFormControl(props);
  const errorMessage = useFormErrorMessage(props);

  return control
    ? (
      <Controller
        control={control}
        name={props.name}
        render={({ field: { onChange: onFieldChange, onBlur: onFieldBlur, value } }) => (
          <RneInput
            errorMessage={errorMessage}
            keyboardAppearance={theme.mode}
            {...props}
            onBlur={(e) => {
              onFieldBlur();
              props.onBlur?.(e);
            }}
            onChangeText={(e) => {
              onFieldChange(e);
              props.onChangeText?.(e);
            }}
            value={value}
          />
        )}
        rules={props.rules}
      />
    )
    : (
      <RneInput {...props} />
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
};
