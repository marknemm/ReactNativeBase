import ErrorText from '@components/error-text/ErrorText';
import { useFormControl, useFormErrorMessage, useValidationRules } from '@hooks/form-hooks';
import { Text, useTheme } from '@rneui/themed';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown as RneDropdown } from 'react-native-element-dropdown';
import { useDropdownItems } from './hooks';
import { DropdownFC, Props } from './props';
import { useStyles } from './styles';

/**
 * A component for a dropdown form field.
 *
 * @param props The component {@link Props}.
 * @param ref The component reference.
 * @returns The {@link Dropdown} component.
 */
const Dropdown: DropdownFC = forwardRef((props, ref) => {
  const { label, name, onBlur, onChange, placeholder, valueField } = props;

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
                onChangeForm(item?.[valueField]);
                onChange?.(item);
              }}
              ref={ref as any}
              value={value}
            />
          )}
          rules={rules}
        />

        <ErrorText
          {...props}
          error={errorMessage}
          style={null}
        />
      </>
    )
    : <DropdownControlled {...props} ref={ref as any} />;
});

/**
 * The controlled {@link Dropdown} component.
 *
 * @param props The component {@link Props}.
 * @param ref The component reference.
 * @returns The {@link DropdownControlled} component.
 */
const DropdownControlled: DropdownFC = forwardRef(({
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
  valueField = 'value' as any,
  ...rneDropdownProps
}, ref) => {
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
        ref={ref as any}
        selectedTextStyle={styles.selectedText}
        style={styles.dropdown}
        valueField={valueField}
        {...rneDropdownProps}
      />
    </View>
  );
});

export default Dropdown;
