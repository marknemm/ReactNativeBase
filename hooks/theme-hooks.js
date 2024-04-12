import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import { getLSItem } from '@util/local-storage';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

/** @typedef {import('@rneui/themed').CreateThemeOptions} CreateThemeOptions */

/**
 * Generates a theme based on the global or configured color scheme and the provided generator function.
 * The configured color scheme is stored in local storage and takes precedence over the global color scheme.
 *
 * @param {(colorScheme: 'light' | 'dark') =>  CreateThemeOptions} genTheme The theme generator function.
 * @returns {CreateThemeOptions} The generated theme.
 */
export function useThemeGenerator(genTheme) {
  const globalColorScheme = useColorScheme();

  return useMemo(() => {
    let colorScheme = getLSItem(SETTINGS_THEME_APPEARANCE_KEY, 'string') || 'auto';
    if (colorScheme === 'auto') {
      colorScheme = globalColorScheme;
    }

    return genTheme(colorScheme);
  }, [genTheme, globalColorScheme]);
}
