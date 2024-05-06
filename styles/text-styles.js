/**
 * Creates general {@link Types.Styles.TextStyles text styles}.
 *
 * @param {Types.Theme.ThemeWithColors} theme The {@link Types.Theme.ThemeWithColors Theme}.
 * @returns {Types.Styles.TextStyles} The {@link Types.Styles.TextStyles text styles}.
 */
export function createTextStyles(theme) {
  return {
    bold: {
      fontWeight: theme.font.weight.bold,
    },
    bolder: {
      fontWeight: theme.font.weight.bolder,
    },
    boldest: {
      fontWeight: theme.font.weight.boldest,
    },
    center: {
      textAlign: 'center',
    },
    doubleUnderline: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'double',
    },
    doubleUnderlineBold: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'double',
      fontWeight: theme.font.weight.bold,
    },
    doubleUnderlineBolder: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'double',
      fontWeight: theme.font.weight.bolder,
    },
    doubleUnderlineBoldest: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'double',
      fontWeight: theme.font.weight.boldest,
    },
    left: {
      textAlign: 'left',
    },
    lineThrough: {
      textDecorationLine: 'line-through',
    },
    right: {
      textAlign: 'right',
    },
    underline: {
      textDecorationLine: 'underline',
    },
    underlineBold: {
      textDecorationLine: 'underline',
      fontWeight: theme.font.weight.bold,
    },
    underlineBolder: {
      textDecorationLine: 'underline',
      fontWeight: theme.font.weight.bolder,
    },
    underlineBoldest: {
      textDecorationLine: 'underline',
      fontWeight: theme.font.weight.boldest,
    },
  };
}
