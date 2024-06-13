/* eslint-disable jsdoc/require-returns-type */
import { useGeneralStyles, useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type Dropdown from './Dropdown';
import type { DropdownStyleProps } from './Dropdown.interfaces';

/**
 * Gets the styles for the {@link Dropdown} component.
 *
 * @param props The component style props.
 * @returns The styles for the {@link Dropdown} component.
 */
export function useStyles({
  containerStyle,
  itemContainerStyle,
  itemTextStyle,
  labelStyle,
  placeholderStyle,
  selectedTextStyle,
  style,
}: DropdownStyleProps) {
  const generalStyles = useGeneralStyles();

  return useThemedStyles((theme) => ({
    container: {
      ...generalStyles.form.fieldContainer,
      ...StyleSheet.flatten(containerStyle),
    },
    dropdown: {
      ...generalStyles.form.field,
      ...generalStyles.form.fieldBorder,
      ...StyleSheet.flatten(style),
    },
    itemContainer: {
      backgroundColor: theme.colors.background,
      ...StyleSheet.flatten(itemContainerStyle),
    },
    itemText: {
      color: theme.colors.black,
      ...StyleSheet.flatten(itemTextStyle),
    },
    label: {
      ...generalStyles.form.label,
      ...StyleSheet.flatten(labelStyle),
    },
    placeholder: {
      ...generalStyles.form.placeholder,
      ...StyleSheet.flatten(placeholderStyle),
    },
    selectedText: {
      color: theme.colors.black,
      ...StyleSheet.flatten(selectedTextStyle),
    },
  }), [
    containerStyle,
    generalStyles,
    itemContainerStyle,
    itemTextStyle,
    labelStyle,
    placeholderStyle,
    selectedTextStyle,
    style,
  ]);
}
