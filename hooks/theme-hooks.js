import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import { useTheme } from '@rneui/themed';
import { getLSItem } from '@util/local-storage';
import { useMemo } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';

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
