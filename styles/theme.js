import { createTheme, darkColors, lightColors } from '@rneui/themed';
import { Appearance, Platform } from 'react-native';

/**
 * Generates the app theme.
 *
 * @param {import("react-native").ColorSchemeName} [colorScheme] The color scheme, either `'dark'` or `'light'`.
 * @returns {import('@rneui/themed').CreateThemeOptions} The generated theme.
 */
export function genTheme(colorScheme = Appearance.getColorScheme() ?? 'light') {
  return createTheme({
    lightColors: {
      ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios,
      }),
    },
    darkColors: {
      ...Platform.select({
        default: darkColors.platform.android,
        ios: darkColors.platform.ios,
      }),
    },
    mode: colorScheme,
    components: {
      Button: {
        raised: false,
      },
      Dialog: {
        overlayStyle: {
          maxHeight: '90%',
        },
      },
    },
  });
}
