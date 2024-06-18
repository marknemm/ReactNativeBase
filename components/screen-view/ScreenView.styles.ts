import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type ScreenView from './ScreenView';
import type { ScreenViewStyleProps } from './ScreenView.interfaces';

/**
 * Gets the styles for the {@link ScreenView} component.
 *
 * @param props The component {@link ScreenViewStyleProps}.
 * @returns The {@link ScreenView} component styles.
 */
export function useStyles({ containerStyle, fullScreen, noFooter, noHeader, style }: ScreenViewStyleProps) {
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
      width: '100%',
      ...StyleSheet.flatten(style),
    },
  }), [containerStyle, fullScreen, noFooter, noHeader, safeAreaInsets, style]);
}
