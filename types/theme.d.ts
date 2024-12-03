import { ColorProps, FontProps, Spacing, ThemeFont } from '@interfaces/theme';
import '@rneui/themed';

/**
 * Extended `react-native-elements` theming.
 */
declare module '@rneui/themed' {
  interface Theme {

    /**
     * The {@link ThemeFont}.
     */
    font: ThemeFont;

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

  interface TextProps extends ColorProps, FontProps {

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

  interface ThemeSpacing {

    /**
     * The horizontal screen spacing.
     */
    screenHorizontal: number;

    /**
     * The vertical screen spacing.
     */
    screenVertical: number;

  }

}
