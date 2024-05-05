import { StyleSheet } from 'react-native';
import { createColorStyles } from './color-styles';
import { createFormStyles } from './form-styles';
import { createImageStyles } from './image-styles';
import { createTextStyles } from './text-styles';
import { createViewStyles } from './view-styles';

/**
 * Creates the {@link Types.Theme.GeneralStyles general styles}.
 *
 * @param {Types.Rneui.CreateThemeOptions} themeOptions The {@link Types.Rneui.CreateThemeOptions theme options}.
 * @returns {Types.Styles.GeneralStyles} The {@link Types.Styles.GeneralStyles general styles}.
 */
export function createGeneralStyles(themeOptions) {
  return {
    color: StyleSheet.create(createColorStyles(themeOptions)),
    form: StyleSheet.create(createFormStyles(themeOptions)),
    image: StyleSheet.create(createImageStyles(themeOptions)),
    text: StyleSheet.create(createTextStyles(themeOptions)),
    view: StyleSheet.create(createViewStyles(themeOptions)),
  };
}
