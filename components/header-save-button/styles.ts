/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { ButtonStyleProps } from '@interfaces/button';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `HeaderSaveButton` component.
 *
 * @param props The component style props.
 * @returns The styles for the `HeaderSaveButton` component.
 */
export function useStyles({ titleStyle }: ButtonStyleProps) {
  return useThemedStyles(() => ({
    title: {
      color: 'white',
      ...StyleSheet.flatten(titleStyle),
    },
  }), [titleStyle]);
}
