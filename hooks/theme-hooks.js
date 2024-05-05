import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import { useTheme } from '@rneui/themed';
import { getLSItem } from '@util/local-storage';
import { useMemo } from 'react';
import { StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Custom hook to get the {@link Types.Rneui.Colors Colors} associated with the theme.
 *
 * @returns {Types.Rneui.Colors} The {@link Types.Rneui.Colors Colors}.
 */
export function useColors() {
  const { theme } = useTheme();
  return theme.colors;
}

/**
 * Custom hook to get the {@link Types.Theme.Font Font} associated with the theme.
 *
 * @returns {Types.Theme.Font} The {@link Types.Theme.Font Font}.
 */
export function useFont() {
  const { theme } = useTheme();
  return theme.font;
}

/**
 * Custom hook to get the {@link Types.Styles.GeneralStyles general styles} associated with the theme.
 *
 * @returns {Types.Styles.GeneralStyles} The {@link Types.Styles.GeneralStyles general styles}.
 * @see {@link import('@styles/general-styles').createGeneralStyles style implementation}.
 */
export function useGeneralStyles() {
  const { theme } = useTheme();
  return theme.styles;
}

/**
 * Custom hook to create a memoized {@link StyleSheet.NamedStyles StyleSheet} using the {@link Types.Rneui.Theme Theme}.
 *
 * @template {StyleSheet.NamedStyles<any>} T The type of the styles object.
 * @param {(theme: Types.Rneui.Theme & { colors: Types.Rneui.Colors }, safeAreaInsets: import('react-native-safe-area-context').EdgeInsets) => T} stylesCb
 * The styles to create the {@link StyleSheet} from.
 * @param {Array} deps Will only recreate the {@link StyleSheet.NamedStyles StyleSheet} when the dependencies have changed.
 * @returns {T} The created {@link StyleSheet.NamedStyles StyleSheet}.
 */
export function useThemedStyles(stylesCb, deps) {
  const { theme } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return useMemo(() =>
    StyleSheet.create(stylesCb(theme, safeAreaInsets)),
  deps); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Custom hook to get the spacing associated with the theme.
 *
 * @returns {Types.Rneui.ThemeSpacing} The {@link Types.Rneui.ThemeSpacing spacing}.
 */
export function useSpacing() {
  const { theme } = useTheme();
  return theme.spacing;
}

/**
 * Custom hook that generates a theme based on the global or configured color scheme and the provided generator function.
 * The configured color scheme is stored in local storage and takes precedence over the global color scheme.
 *
 * @param {(colorScheme: 'light' | 'dark', windowDimensions: Types.ScaledSize) =>  Types.Rneui.CreateThemeOptions} genTheme The theme generator function.
 * @returns {Types.Rneui.CreateThemeOptions} The generated theme.
 */
export function useThemeGenerator(genTheme) {
  const globalColorScheme = useColorScheme();
  const windowDimensions = useWindowDimensions();

  return useMemo(() => {
    let colorScheme = getLSItem(SETTINGS_THEME_APPEARANCE_KEY, 'string') || 'auto';
    if (colorScheme === 'auto') {
      colorScheme = globalColorScheme;
    }

    return genTheme(colorScheme, windowDimensions);
  }, [genTheme, globalColorScheme, windowDimensions]);
}
