import { deriveColor, deriveFontSize, deriveFontWeight } from '@util/theme';
import { scale } from 'react-native-size-matters';

/**
 * The `Text` component theme.
 *
 * @param {Types.Rneui.TextProps} props The `Text` component {@link Types.Rneui.TextProps properties}.
 * @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
 * @returns {Types.Rneui.TextProps} The default themed `Text` component {@link Types.Rneui.TextProps properties}.
 */
export default function Text(props, theme) {
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
 * @param {Types.Rneui.TextProps} props The `Text` component {@link Types.Rneui.TextProps properties}.
 * @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
 * @returns {number} The text size.
 */
function deriveTextSize({ fontLarge, fontLarger, fontSmall, h1, h2, h3, h4 }, theme) {
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
 * @param {Types.Rneui.TextProps} props The `Text` component {@link Types.Rneui.TextProps properties}.
 * @returns {'line-through' | 'none' | 'underline' | 'underline line-through'} The text decoration line.
 */
function deriveTextDecorationLine({ underline, doubleUnderline, lineThrough }) {
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
