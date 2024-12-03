import { useGeneralStyles, useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type Input from './Input';
import type { InputStyleProps } from './Input.interfaces';

/**
 * Gets the styles for the {@link Input} component.
 *
 * @param props The component {@link InputStyleProps}.
 * @returns The styles for the {@link Input} component.
 */
export function useStyles({ containerStyle, inputContainerStyle, inputStyle, labelStyle, style }: InputStyleProps) {
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
