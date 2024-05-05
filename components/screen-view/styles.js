/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `ScreenView` component.
 *
 * @param {object} props The props of the `ScreenView` component.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the view.
 * @returns The styles for the `ScreenView` component.
 */
export function useStyles({ style }) {
  return useThemedStyles((theme, safeAreaInsets) => ({
    viewStyle: {
      flex: 1,
      paddingBottom: safeAreaInsets.bottom,
      ...StyleSheet.flatten(style),
    },
  }), [style]);
}
