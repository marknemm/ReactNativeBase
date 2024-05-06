/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `Backdrop` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the backdrop.
 * @returns The styles for the `Backdrop` component.
 */
export function useStyles({ style }) {
  return useThemedStyles((theme) => ({
    backdrop: {
      backgroundColor: `${theme.colors.grey0}33`,
      ...StyleSheet.absoluteFillObject,
      ...StyleSheet.flatten(style),
    },
  }), [style]);
}
