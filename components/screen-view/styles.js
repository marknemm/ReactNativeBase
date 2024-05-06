/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Gets the styles for the `ScreenView` component.
 *
 * @param {object} props The props of the `ScreenView` component.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.containerStyle] The style to apply to the container.
 * @param {boolean} [props.fullScreen] Whether to apply full screen styling.
 * @param {boolean} [props.noFooter] Whether to apply no footer styling.
 * @param {boolean} [props.noHeader] Whether to apply no header styling.
 * @param {Types.StyleProp<Types.ViewStyle>} [props.style] The style to apply to the view.
 * @returns The styles for the `ScreenView` component.
 */
export function useStyles({ containerStyle, fullScreen, noFooter, noHeader, style }) {
  const safeAreaInsets = useSafeAreaInsets();

  return useThemedStyles((theme) => ({
    container: {
      width: '100%',
      height: '100%',
      ...StyleSheet.flatten(containerStyle),
    },
    inner: {
      flex: 1,
      marginHorizontal: 'auto',
      maxWidth: 1200,
      paddingBottom: (fullScreen || noFooter)
        ? Math.max(safeAreaInsets.bottom, theme.spacing.screenVertical)
        : theme.spacing.screenVertical,
      paddingLeft: Math.max(safeAreaInsets.left, theme.spacing.screenHorizontal),
      paddingRight: Math.max(safeAreaInsets.right, theme.spacing.screenHorizontal),
      paddingTop: (fullScreen || noHeader)
        ? Math.max(safeAreaInsets.top, theme.spacing.screenVertical)
        : theme.spacing.screenVertical,
      ...StyleSheet.flatten(style),
    },
  }), [containerStyle, fullScreen, noFooter, noHeader, safeAreaInsets, style]);
}
