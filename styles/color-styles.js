/**
 * Creates general color styles.
 *
 * @param {Types.Rneui.CreateThemeOptions} themeOptions The {@link Types.Rneui.CreateThemeOptions theme options}.
 * @returns {Types.Styles.ColorStyles} The {@link Types.Styles.ColorStyles color styles}.
 */
export function createColorStyles(themeOptions) {
  const colors = (themeOptions.mode === 'dark')
    ? themeOptions.darkColors
    : themeOptions.lightColors;

  return {
    background: {
      backgroundColor: colors.background,
    },
    black: {
      color: colors.black,
    },
    blackBg: {
      backgroundColor: colors.black,
    },
    gray0: {
      color: colors.grey0,
    },
    gray0Bg: {
      backgroundColor: colors.grey0,
    },
    gray1: {
      color: colors.grey1,
    },
    gray1Bg: {
      backgroundColor: colors.grey1,
    },
    gray2: {
      color: colors.grey2,
    },
    gray2Bg: {
      backgroundColor: colors.grey2,
    },
    gray3: {
      color: colors.grey3,
    },
    gray3Bg: {
      backgroundColor: colors.grey3,
    },
    gray4: {
      color: colors.grey4,
    },
    gray4Bg: {
      backgroundColor: colors.grey4,
    },
    gray5: {
      color: colors.grey5,
    },
    gray5Bg: {
      backgroundColor: colors.grey5,
    },
    grayOutline: {
      borderColor: colors.greyOutline,
    },
    error: {
      color: colors.error,
    },
    errorBg: {
      backgroundColor: colors.error,
    },
    muted: {
      color: colors.grey3,
    },
    mutedBg: {
      backgroundColor: colors.grey3,
    },
    placeholder: {
      color: colors.placeholder,
    },
    primary: {
      color: colors.primary,
    },
    primaryBg: {
      backgroundColor: colors.primary,
    },
    searchBg: {
      backgroundColor: colors.searchBg,
    },
    secondary: {
      color: colors.secondary,
    },
    secondaryBg: {
      backgroundColor: colors.secondary,
    },
    success: {
      color: colors.success,
    },
    successBg: {
      backgroundColor: colors.success,
    },
    warning: {
      color: colors.warning,
    },
    warningBg: {
      backgroundColor: colors.warning,
    },
    white: {
      color: colors.white,
    },
    whiteBg: {
      backgroundColor: colors.white,
    },
  };
}
