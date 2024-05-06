/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `Camera` component.
 *
 * @param {object} props The component props.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the camera.
 * @returns The styles for the `Camera` component.
 */
export function useStyles({ style }) {
  return useThemedStyles(() => ({
    camera: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      ...StyleSheet.flatten(style),
    },
  }), [style]);
}
