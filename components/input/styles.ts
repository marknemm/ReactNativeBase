/* eslint-disable jsdoc/require-returns-type */
import { useGeneralStyles, useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `Input` component.
 *
 * @param props The component style props.
 * @returns The styles for the `Input` component.
 */
export function useStyles({ containerStyle, inputContainerStyle, inputStyle, labelStyle, style }: StyleProps) {
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
