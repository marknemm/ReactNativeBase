import FormError from '@components/form-error/FormError';
import { useFormControl } from '@hooks/form-hooks';
import { useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Dropdown as RneDropdown } from 'react-native-element-dropdown';
import { useDropdownItems } from './hooks';
import { useStyles } from './styles';

/**
 * The {@link Dropdown} component.
 *
 * @param {Types.Dropdown.DropdownProps} props The component {@link Types.Dropdown.DropdownProps properties}.
 * @returns {React.JSX.Element} The {@link Dropdown} component.
 * @throws {Error} The `name` property is required when using form controls.
 */
export default function Dropdown(props) {
  const { name, onBlur, onChange, rules } = props;
  const control = useFormControl(props);

  return control
    ? (
      <>
        <Controller
          control={control}
          name={name}
          render={({ field: { onBlur: onBlurForm, onChange: onChangeForm, value } }) => (
            <DropdownControlled
              {...props}
              onBlur={() => {
                onBlurForm();
                onBlur?.();
              }}
              onChange={() => {
                onChangeForm();
                onChange?.();
              }}
              value={value}
            />
          )}
          rules={rules}
        />
        <FormError {...props} style={null} />
      </>
    )
    : <DropdownControlled {...props} />;
}

/**
 * The {@link DropdownControlled} component.
 *
 * @param {Types.Dropdown.DropdownProps} props The component {@link Types.Dropdown.DropdownProps properties}.
 * @returns {React.JSX.Element} The {@link DropdownControlled} component.
 */
function DropdownControlled(props) {
  const styles = useStyles(props);
  const { theme } = useTheme();
  const { data, includeEmptyOption, labelField = 'label', onChange, valueField = 'value' } = props;
  const items = useDropdownItems(data, labelField, valueField, includeEmptyOption);

  return (
    <RneDropdown
      activeColor={theme.colors.grey5}
      placeholderStyle={styles.placeholder}
      {...props}
      data={items}
      itemContainerStyle={styles.itemContainer}
      itemTextStyle={styles.itemText}
      labelField={labelField}
      onChange={onChange}
      selectedTextStyle={styles.selectedText}
      style={styles.dropdown}
      valueField={valueField}
    />
  );
}

Dropdown.propTypes = {
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  rules: PropTypes.object,
};

DropdownControlled.propTypes = {
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
  value: PropTypes.any,
  valueField: PropTypes.string,
};
