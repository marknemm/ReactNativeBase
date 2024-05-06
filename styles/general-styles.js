import { StyleSheet } from 'react-native';
import { createColorStyles } from './color-styles';
import { createFormStyles } from './form-styles';
import { createImageStyles } from './image-styles';
import { createTextStyles } from './text-styles';
import { createViewStyles } from './view-styles';

/**
 * Creates the {@link Types.Theme.GeneralStyles general styles}.
 *
 * @param {Types.Theme.ThemeWithColors} theme The {@link Types.Theme.ThemeWithColors Theme}.
 * @returns {Types.Styles.GeneralStyles} The {@link Types.Styles.GeneralStyles general styles}.
 */
export function createGeneralStyles(theme) {
  return {
    color: StyleSheet.create(createColorStyles(theme)),
    form: StyleSheet.create(createFormStyles(theme)),
    image: StyleSheet.create(createImageStyles(theme)),
    text: StyleSheet.create(createTextStyles(theme)),
    view: StyleSheet.create(createViewStyles(theme)),
  };
}
