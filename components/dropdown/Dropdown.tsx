import FormError from '@components/form-error/FormError';
import { useFormControl, useFormErrorMessage, useValidationRules } from '@hooks/form-hooks';
import { Text, useTheme } from '@rneui/themed';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown as RneDropdown } from 'react-native-element-dropdown';
import { useDropdownItems } from './hooks';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * A component for a dropdown form field.
 */
const Dropdown: React.FC<Props> = (props) => {
  const { label, name, onBlur, onChange, placeholder } = props;

  // Derive entities related to a dropdown controlled by react-hook-form
  const control = useFormControl(props);
  const rules = useValidationRules(props, label?.toString() || placeholder);
  const errorMessage = useFormErrorMessage(rules, props);

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
              onChange={(item) => {
                onChangeForm(item?.value);
                onChange?.(item?.value);
              }}
              value={value}
            />
          )}
          rules={rules}
        />

        <FormError
          {...props}
          errorMessage={errorMessage}
          style={null}
        />
      </>
    )
    : <DropdownControlled {...props} />;
}

/**
 * The controlled {@link Dropdown} component.
 */
const DropdownControlled: React.FC<Props> = ({
  containerStyle,
  data,
  includeEmptyOption,
  itemContainerStyle,
  itemTextStyle,
  label = 'label',
  labelField,
  labelStyle,
  onChange,
  placeholderStyle,
  selectedTextStyle,
  style,
  valueField = 'value',
  ...rneDropdownProps
}) => {
  const styles = useStyles({
    containerStyle,
    itemContainerStyle,
    itemTextStyle,
    labelStyle,
    placeholderStyle,
    selectedTextStyle,
    style,
  });
  const { theme } = useTheme();
  const items = useDropdownItems(data, labelField, valueField, includeEmptyOption);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <RneDropdown
        activeColor={theme.colors.grey5}
        data={items}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemText}
        labelField={labelField}
        onChange={onChange}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        style={styles.dropdown}
        valueField={valueField}
        {...rneDropdownProps}
      />
    </View>
  );
}

export default Dropdown;
