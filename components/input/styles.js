/* eslint-disable jsdoc/require-returns-type */
import { useGeneralStyles, useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `Input` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.containerStyle] The style to apply to the container.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.inputContainerStyle] The style to apply to the input container.
 * @param {Types.StyleProp<Types.TextStyle>} [props.inputStyle] The style to apply to the input.
 * @param {Types.StyleProp<Types.TextStyle>} [props.labelStyle] The style to apply to the label.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the input value.
 * @returns The styles for the `Input` component.
 */
export function useStyles({ containerStyle, inputContainerStyle, inputStyle, labelStyle, style }) {
  const generalStyles = useGeneralStyles();

  return useThemedStyles(() => ({
    container: {
      ...generalStyles.form.fieldContainer,
      ...StyleSheet.flatten(containerStyle),
    },
    inputContainer: {
      ...generalStyles.form.fieldBorder,
      ...StyleSheet.flatten(inputContainerStyle),
    },
    input: {
      ...generalStyles.form.field,
      ...StyleSheet.flatten(inputStyle),
    },
    label: {
      ...generalStyles.form.label,
      ...StyleSheet.flatten(labelStyle),
    },
    style: {
      ...generalStyles.form.fieldText,
      ...StyleSheet.flatten(style),
    },
  }), [containerStyle, inputContainerStyle, inputStyle, generalStyles, labelStyle, style]);
}