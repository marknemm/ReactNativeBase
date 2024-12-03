import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import { ThemeFont, ThemeGeneratorFn, ThemeWithColors } from '@interfaces/theme';
import { Colors, CreateThemeOptions, ThemeSpacing, useTheme } from '@rneui/themed';
import { getLSItem } from '@util/local-storage';
import { useMemo } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';

/**
 * Custom hook to get the {@link Colors} associated with the {@link ThemeWithColors Theme}.
 *
 * @returns The {@link Colors}.
 */
export function useColors(): Colors {
  const { theme } = useTheme();
  return theme.colors;
}

/**
 * Custom hook to get the {@link ThemeFont} associated with the {@link ThemeWithColors Theme}.
 *
 * @returns The {@link ThemeFont}.
 */
export function useFont(): ThemeFont {
  const { theme } = useTheme();
  return theme.font;
}

/**
 * Custom hook to get the {@link ThemeSpacing} associated with the {@link ThemeWithColors Theme}.
 *
 * @returns The {@link ThemeSpacing}.
 */
export function useSpacing(): ThemeSpacing {
  const { theme } = useTheme();
  return theme.spacing;
}

/**
 * Custom hook that generates a theme based on the global or configured color scheme and the provided {@link genTheme} function.
 * The configured color scheme is stored in local storage and takes precedence over the global color scheme.
 *
 * @param genTheme The {@link ThemeGeneratorFn}.
 * @returns The generated {@link CreateThemeOptions Theme options}.
 */
export function useThemeGenerator(genTheme: ThemeGeneratorFn): CreateThemeOptions {
  const globalColorScheme = useColorScheme();
  const windowDimensions = useWindowDimensions();

  return useMemo(() => {
    let colorScheme: 'light' | 'dark' | 'auto' = getLSItem(SETTINGS_THEME_APPEARANCE_KEY, 'string') || 'auto';
    if (colorScheme === 'auto') {
      colorScheme = globalColorScheme;
    }

    return genTheme(colorScheme, windowDimensions);
  }, [genTheme, globalColorScheme, windowDimensions]);
}
