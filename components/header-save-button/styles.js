/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `HeaderSaveButton` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.TextStyle>} [props.titleStyle] The style to apply to the title.
 * @returns The styles for the `HeaderSaveButton` component.
 */
export function useStyles({ titleStyle }) {
  return useThemedStyles(() => ({
    title: {
      color: 'white',
      ...StyleSheet.flatten(titleStyle),
    },
  }), [titleStyle]);
}
