import { Colors, CreateThemeOptions, Theme } from '@rneui/themed';
import { FontWeight } from '@interfaces/styles';
import { ScaledSize } from 'react-native';

export { FontWeight };

/**
 * Symbolic or numeric-string font weight.
 */
export type Bold = boolean | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

/**
 * Symbolic or numeric spacing.
 */
export type Spacing = boolean | number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * The {@link Theme} with {@link Colors}.
 */
export type ThemeWithColors = Theme & { colors: Colors };

/**
 * The theme generator function.
 */
export type ThemeGeneratorFn = (colorScheme: 'light' | 'dark', windowDimensions: ScaledSize) =>  CreateThemeOptions;

/**
 * The {@link ThemeFont}.
 */
export interface ThemeFont {

  /**
   * The font family.
   */
  family?: string;

  /**
   * The font size.
   */
  size: {
    small?: number;
    normal?: number;
    large?: number;
    larger?: number;
    largest?: number;
  };

  /**
   * The font weight.
   */
  weight: {
    lightest?: FontWeight;
    lighter?: FontWeight;
    light?: FontWeight;
    normal?: FontWeight;
    bold?: FontWeight;
    bolder?: FontWeight;
    boldest?: FontWeight;
  }

}

export interface ColorProps {

  /**
   * The (theme) color.
   */
  color?: string;

  /**
   * If `true`, the color will be muted.
   */
  muted?: boolean;

}

export interface FontProps extends FontSizeProps, FontWeightProps {

  /**
   * The font family.
   */
  fontFamily?: string;

}

export interface FontSizeProps {

  /**
   * The font size.
   */
  fontSize?: number;

  /**
   * If `true`, the font size will be small.
   */
  fontSmall?: boolean;

  /**
   * If `true`, the font size will be large.
   */
  fontLarge?: boolean;

  /**
   * If `true`, the font size will be larger.
   */
  fontLarger?: boolean;

  /**
   * The font weight.
   */
  fontWeight?: FontWeight;

}

export interface FontWeightProps {

  /**
   * The {@link FontWeight fontWeight} value.
   */
  fontWeight?: FontWeight;

  /**
   * If `true`, the font weight will be the lightest.
   */
  lightest?: boolean;

  /**
   * If `true`, the font weight will be lighter.
   */
  lighter?: boolean;

  /**
   * If `true`, the font weight will be light.
   */
  light?: boolean;

  /**
   * If `true`, the font weight will be bold.
   */
  b?: boolean;

  /**
   * If `true`, the font weight will be bolder.
   */
  bolder?: boolean;

  /**
   * If `true`, the font weight will be the boldest.
   */
  boldest?: boolean;

}
