/**
 * Creates general color styles.
 *
 * @param {Types.Theme.ThemeWithColors} theme The {@link Types.Theme.ThemeWithColors Theme}.
 * @returns {Types.Styles.ColorStyles} The {@link Types.Styles.ColorStyles color styles}.
 */
export function createColorStyles(theme) {
  return {
    background: {
      backgroundColor: theme.colors.background,
    },
    black: {
      color: theme.colors.black,
    },
    blackBg: {
      backgroundColor: theme.colors.black,
    },
    gray0: {
      color: theme.colors.grey0,
    },
    gray0Bg: {
      backgroundColor: theme.colors.grey0,
    },
    gray1: {
      color: theme.colors.grey1,
    },
    gray1Bg: {
      backgroundColor: theme.colors.grey1,
    },
    gray2: {
      color: theme.colors.grey2,
    },
    gray2Bg: {
      backgroundColor: theme.colors.grey2,
    },
    gray3: {
      color: theme.colors.grey3,
    },
    gray3Bg: {
      backgroundColor: theme.colors.grey3,
    },
    gray4: {
      color: theme.colors.grey4,
    },
    gray4Bg: {
      backgroundColor: theme.colors.grey4,
    },
    gray5: {
      color: theme.colors.grey5,
    },
    gray5Bg: {
      backgroundColor: theme.colors.grey5,
    },
    grayOutline: {
      borderColor: theme.colors.greyOutline,
    },
    error: {
      color: theme.colors.error,
    },
    errorBg: {
      backgroundColor: theme.colors.error,
    },
    muted: {
      color: theme.colors.grey3,
    },
    mutedBg: {
      backgroundColor: theme.colors.grey3,
    },
    placeholder: {
      color: theme.colors.placeholder,
    },
    primary: {
      color: theme.colors.primary,
    },
    primaryBg: {
      backgroundColor: theme.colors.primary,
    },
    searchBg: {
      backgroundColor: theme.colors.searchBg,
    },
    secondary: {
      color: theme.colors.secondary,
    },
    secondaryBg: {
      backgroundColor: theme.colors.secondary,
    },
    success: {
      color: theme.colors.success,
    },
    successBg: {
      backgroundColor: theme.colors.success,
    },
    warning: {
      color: theme.colors.warning,
    },
    warningBg: {
      backgroundColor: theme.colors.warning,
    },
    white: {
      color: theme.colors.white,
    },
    whiteBg: {
      backgroundColor: theme.colors.white,
    },
  };
}
