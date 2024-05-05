/**
 * Creates general {@link Types.Styles.TextStyles text styles}.
 *
 * @param {Types.Rneui.CreateThemeOptions} themeOptions The {@link Types.Rneui.CreateThemeOptions theme options}.
 * @returns {Types.Styles.TextStyles} The {@link Types.Styles.TextStyles text styles}.
 */
export function createTextStyles(themeOptions) {
  return {
    bold: {
      fontWeight: themeOptions.font.weight.bold,
    },
    bolder: {
      fontWeight: themeOptions.font.weight.bolder,
    },
    boldest: {
      fontWeight: themeOptions.font.weight.boldest,
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
      fontWeight: themeOptions.font.weight.bold,
    },
    doubleUnderlineBolder: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'double',
      fontWeight: themeOptions.font.weight.bolder,
    },
    doubleUnderlineBoldest: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'double',
      fontWeight: themeOptions.font.weight.boldest,
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
      fontWeight: themeOptions.font.weight.bold,
    },
    underlineBolder: {
      textDecorationLine: 'underline',
      fontWeight: themeOptions.font.weight.bolder,
    },
    underlineBoldest: {
      textDecorationLine: 'underline',
      fontWeight: themeOptions.font.weight.boldest,
    },
  };
}
