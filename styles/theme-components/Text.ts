import { TextDecoration } from '@interfaces/styles';
import { ThemeWithColors } from '@interfaces/theme';
import { TextProps } from '@rneui/themed';
import { deriveColor, deriveFontSize, deriveFontWeight } from '@util/theme';
import { scale } from 'react-native-size-matters';

/**
 * The `Text` component theme.
 *
 * @param props The `Text` component {@link TextProps properties}.
 * @param theme The {@link ThemeWithColors theme}.
 * @returns The default themed `Text` component {@link TextProps properties}.
 */
export default function Text(props: TextProps, theme: ThemeWithColors): TextProps {
  return {
    style: {
      color: deriveColor(props, theme) ?? theme.colors.black,
      fontFamily: theme.font.family,
      fontSize: deriveTextSize(props, theme),
      fontStyle: props.i
        ? 'italic'
        : 'normal',
      fontWeight: deriveFontWeight(props, theme),
      marginBottom: props.p
        ? theme.spacing.md
        : 0,
      textAlign: props.center
        ? 'center'
        : props.right
          ? 'right'
          : 'left',
      textDecorationLine: deriveTextDecorationLine(props),
      textDecorationStyle: props.doubleUnderline
        ? 'double'
        : 'solid',
    },
  };
}

/**
 * Derives the text size.
 *
 * @param props The `Text` component {@link TextProps properties}.
 * @param theme The {@link ThemeWithColors Theme}.
 * @returns The text size.
 */
function deriveTextSize(
  { fontLarge, fontLarger, fontSmall, h1, h2, h3, h4 }: TextProps,
  theme: ThemeWithColors
): number {
  if (h1) {
    return scale(32);
  }

  if (h2) {
    return scale(24);
  }

  if (h3) {
    return theme.font.size.larger;
  }

  if (h4) {
    return theme.font.size.large;
  }

  return deriveFontSize({ fontLarge, fontLarger, fontSmall }, theme);
}

/**
 * Derives the text decoration line.
 *
 * @param props The `Text` component {@link TextProps properties}.
 * @returns The text decoration line.
 */
function deriveTextDecorationLine({ underline, doubleUnderline, lineThrough }: TextProps): TextDecoration {
  if (underline || doubleUnderline) {
    return lineThrough
      ? 'underline line-through'
      : 'underline';
  }

  if (lineThrough) {
    return 'line-through';
  }

  return 'none';
}
