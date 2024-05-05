/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `Avatar` component.
 *
 * @param {object} props The component props.
 * @param {string} props.backgroundColor The background color of the avatar.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.containerStyle] The style to apply to the container.
 * @returns The styles for the `Avatar` component.
 */
export function useStyles({ backgroundColor, containerStyle }) {
  return useThemedStyles(() => ({
    container: {
      backgroundColor,
      ...StyleSheet.flatten(containerStyle),
    },
  }), [backgroundColor, containerStyle]);
}
