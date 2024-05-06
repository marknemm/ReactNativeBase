/* eslint-disable jsdoc/require-returns-type */
import { useGeneralStyles, useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `Dropdown` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.containerStyle] The style to apply to the container.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.itemContainerStyle] The style to apply to the item container.
 * @param {Types.StyleProp<Types.TextStyle>} [props.itemTextStyle] The style to apply to the item text.
 * @param {Types.StyleProp<Types.TextStyle>} [props.labelStyle] The style to apply to the label.
 * @param {Types.StyleProp<Types.TextStyle>} [props.placeholderStyle] The style to apply to the placeholder.
 * @param {Types.StyleProp<Types.TextStyle>} [props.selectedTextStyle] The style to apply to the selected text.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the dropdown.
 * @returns The styles for the `Dropdown` component.
 */
export function useStyles({
  containerStyle,
  itemContainerStyle,
  itemTextStyle,
  labelStyle,
  placeholderStyle,
  selectedTextStyle,
  style,
}) {
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
