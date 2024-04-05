import { createTheme, darkColors, lightColors } from '@rneui/themed';
import { Appearance, Platform } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

/**
 * Generates the app theme.
 *
 * @param {import("react-native").ColorSchemeName} [colorScheme] The color scheme, either `'dark'` or `'light'`.
 * @returns {import('@rneui/themed').CreateThemeOptions} The generated theme.
 */
export function genRneTheme(colorScheme = Appearance.getColorScheme() ?? 'light') {
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
      }
    },
  });
}

/**
 * Generates the navigation theme.
 *
 * @param {import('@rneui/themed').Theme & { colors: import('@rneui/themed').Colors }} rneTheme The react native elements (global) theme.
 * @returns {import('@react-navigation/native').Theme} The generated navigation theme.
 */
export function genNavTheme(rneTheme) {
  const dark = rneTheme.mode === 'dark';
  const navDefaultTheme = dark ? DarkTheme : DefaultTheme;

  return {
    dark,
    colors: {
      ...navDefaultTheme.colors,
      ...rneTheme.colors,
      text: rneTheme.colors.black,
    },
  };
}
