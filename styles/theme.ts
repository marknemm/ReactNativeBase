import { CreateThemeOptions, createTheme, darkColors, lightColors } from '@rneui/themed';
import { Appearance, ColorSchemeName, Dimensions, Platform, ScaledSize } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Divider from './theme-components/Divider';
import Text from './theme-components/Text';

/**
 * Generates the app {@link CreateThemeOptions}.
 *
 * @param colorScheme The {@link ColorSchemeName}, either `'dark'` or `'light'`.
 * @param windowDimensions The window {@link ScaledSize}.
 * @returns The generated {@link CreateThemeOptions}.
 */
export function genTheme(
  colorScheme: ColorSchemeName = Appearance.getColorScheme() ?? 'light',
  windowDimensions: ScaledSize = Dimensions.get('window')
): CreateThemeOptions {
  return createTheme({
    mode: colorScheme,
    lightColors: {
      ...lightColors,
      ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios,
      }),
      placeholder: lightColors.grey3,
    },
    darkColors: {
      ...darkColors,
      ...Platform.select({
        default: darkColors.platform.android,
        ios: darkColors.platform.ios,
      }),
      placeholder: darkColors.grey3,
    },
    font: {
      size: {
        small: moderateScale(12),
        normal: moderateScale(15),
        large: moderateScale(18),
        larger: moderateScale(20),
      },
      weight: {
        lightest: '100',
        lighter: '200',
        light: '300',
        normal: 'normal',
        bold: 'bold',
        bolder: '700',
        boldest: '900',
      },
    },
    spacing: {
      xs: moderateScale(2),
      sm: moderateScale(4),
      md: moderateScale(8),
      lg: moderateScale(12),
      xl: moderateScale(24),
      screenHorizontal: (windowDimensions.width >= 768)
        ? moderateScale(24)
        : moderateScale(12),
      screenVertical: moderateScale(24),
    },
    components: {
      Divider,
      Text,
    },
  });
}
