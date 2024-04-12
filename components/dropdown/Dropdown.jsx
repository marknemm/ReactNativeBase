/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import FormError from '@components/form-error/FormError';
import { useFormControl } from '@hooks/form-field-hooks';
import { useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { Dropdown as RneDropdown } from 'react-native-element-dropdown';
import { styles } from './styles';

/**
 * The dropdown component.
 *
 * @param {Types.Dropdown.DropdownProps} props The component {@link Types.Dropdown.DropdownProps properties}.
 * @returns {React.JSX.Element} The dropdown component.
 * @throws {Error} The name property is required when using form controls.
 */
export default function Dropdown(props) {
  const { theme } = useTheme();
  const control = useFormControl(props);
  const labelField = props.labelField || 'label';
  const onChange = props.onChange ?? (() => {});
  const valueField = props.valueField || 'value';

  const data = useMemo(
    () => genDropdownData(props.data, labelField, valueField, props.includeEmptyOption),
    [props.data, labelField, valueField, props.includeEmptyOption]
  );

  return control
    ? (
      <>
        <Controller
          control={control}
          name={props.name}
          render={({ field: { onChange: onFieldChange, onBlur: onFieldBlur, value } }) => (
            <RneDropdown
              activeColor={theme.colors.grey5}
              placeholderStyle={styles.placeholder}
              {...props}
              data={data}
              itemContainerStyle={[
                { backgroundColor: theme.colors.background },
                props.itemContainerStyle,
              ]}
              itemTextStyle={[
                { color: theme.colors.black },
                props.itemTextStyle,
              ]}
              labelField={labelField}
              onBlur={() => {
                onFieldBlur();
                props.onBlur?.();
              }}
              onChange={(newValue) => {
                onFieldChange(newValue);
                onChange(newValue);
              }}
              selectedTextStyle={[
                { color: theme.colors.black },
                props.selectedTextStyle,
              ]}
              style={[styles.dropdown, props.style]}
              value={value}
              valueField={valueField}
            />
          )}
          rules={props.rules}
        />
        <FormError {...props} style={null} />
      </>
    )
    : (
      <RneDropdown
        placeholderStyle={styles.placeholder}
        style={styles.dropdown}
        {...props}
        data={data}
        labelField={labelField}
        onChange={onChange}
        valueField={valueField}
      />
    );
}

/**
 * Generate dropdown data from an array of values.
 *
 * @param {Array<string | number | boolean | { label: string, value: any } | Object>} data The values to generate dropdown data from.
 * @param {string} [labelField='label'] The field to use as the label.
 * @param {string} [valueField='value'] The field to use as the value.
 * @param {boolean} [includeEmptyOption=false] Whether to include an empty option.
 * @returns {any[]} The dropdown data.
 */
function genDropdownData(data, labelField = 'label', valueField = 'value', includeEmptyOption = false) {
  const dropdownData = data
    ? data.map((datum) => {
      if (typeof datum === 'string' || typeof datum === 'number' || typeof datum === 'boolean' || !datum) {
        const dropdownDatum = {};
        dropdownDatum[labelField] = `${datum}`;
        dropdownDatum[valueField] = `${datum}`;
        return dropdownDatum;
      }
      return datum;
    })
    : [];

  if (includeEmptyOption) {
    const emptyDatum = {};
    emptyDatum[labelField] = '';
    emptyDatum[valueField] = null;
    dropdownData.unshift(emptyDatum);
  }

  return dropdownData;
}

Dropdown.propTypes = {
  control: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }),
  ])),
  errorMsg: PropTypes.string,
  errors: PropTypes.object,
  includeEmptyOption: PropTypes.bool,
  itemContainerStyle: PropTypes.object,
  itemTextStyle: PropTypes.object,
  labelField: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  rules: PropTypes.object,
  selectedTextStyle: PropTypes.object,
  valueField: PropTypes.string,
};
