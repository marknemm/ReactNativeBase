import { createTheme, darkColors, lightColors } from '@rneui/themed';
import { Appearance, Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { createGeneralStyles } from './general-styles';
import Divider from './theme-components/Divider';
import Input from './theme-components/Input';
import Text from './theme-components/Text';

/**
 * Generates the app theme options.
 *
 * @param {Types.ColorSchemeName} [colorScheme] The {@link Types.ColorSchemeName color scheme}, either `'dark'` or `'light'`.
 * @returns {Types.Rneui.CreateThemeOptions} The generated {@link Types.Rneui.CreateThemeOptions theme options}.
 */
export function genTheme(colorScheme = Appearance.getColorScheme() ?? 'light') {
  const themeOptions = createTheme({
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
    },
    components: {
      Divider,
      Input,
      Text,
    },
  });

  themeOptions.styles = createGeneralStyles(themeOptions);

  return themeOptions;
}
