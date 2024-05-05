import '@rneui/themed';
import { TextStyle } from 'react-native';
import { ViewStyle } from 'react-native-size-matters';
import { FontWeight, GeneralStyles } from './styles';

/**
 * Symbolic or numeric-string font weight.
 */
export type Bold = boolean | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

/**
 * Symbolic or numeric spacing.
 */
export type Spacing = boolean | number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

declare module '@rneui/themed' {
  interface Theme {

    /**
     * The theme {@link Font}.
     */
    font: Font;

    /**
     * The {@link GeneralStyles general styles}.
     */
    styles: GeneralStyles;

  }

  interface Colors {

    /**
     * The placeholder color.
     */
    placeholder: string;

  }

  interface DividerProps {

    /**
     * The spacing to use on each side of the divider. Defaults to `'md'`.
     *
     * @default 'md'
     */
    spacing?: Spacing;

    /**
     * The spacing to use on the end of the divider.
     */
    spacingEnd?: Spacing;

    /**
     * The spacing to use on the start of the divider.
     */
    spacingStart?: Spacing;

  }

  interface TextProps extends ColorProps, FontProps, SpacingProps {

    /**
     * If `true`, the text will be bold.
     */
    b?: boolean;

    /**
     * If `true`, the text will be centered.
     */
    center?: boolean;

    /**
     * If color of the text.
     */
    color?: string;

    /**
     * If `true`, the text will be double underlined.
     */
    doubleUnderline?: boolean;

    /**
     * If `true`, the text will be italic.
     */
    i?: boolean;

    /**
     * If `true`, the text will be decorated with a line through it.
     */
    lineThrough?: boolean;

    /**
     * If `true`, the text will be a muted color.
     */
    muted?: boolean;

    /**
     * If `true`, the text will be a paragraph with margin on the bottom.
     */
    p?: boolean;

    /**
     * If `true`, the text will be right aligned.
     */
    right?: boolean;

    /**
     * If `true`, the text will be underlined.
     */
    underline?: boolean;

  }
}

/**
 * The theme {@link Font}.
 */
export interface Font {
  family?: string;
  size: {
    small?: number;
    normal?: number;
    large?: number;
    larger?: number;
    largest?: number;
  };
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
