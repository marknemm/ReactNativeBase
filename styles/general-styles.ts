import { StyleSheet } from 'react-native';
import { createColorStyles } from './color-styles';
import { createFormStyles } from './form-styles';
import { createImageStyles } from './image-styles';
import { createTextStyles } from './text-styles';
import { createViewStyles } from './view-styles';
import { GeneralStyles } from '@interfaces/styles';
import { ThemeWithColors } from '@interfaces/theme';

export { GeneralStyles };

/**
 * Creates the {@link GeneralStyles}.
 *
 * @param theme The {@link ThemeWithColors Theme}.
 * @returns The {@link GeneralStyles}.
 */
export function createGeneralStyles(theme: ThemeWithColors): GeneralStyles {
  return {
    color: StyleSheet.create(createColorStyles(theme)),
    form: StyleSheet.create(createFormStyles(theme)),
    image: StyleSheet.create(createImageStyles(theme)),
    text: StyleSheet.create(createTextStyles(theme)),
    view: StyleSheet.create(createViewStyles(theme)),
  };
}
