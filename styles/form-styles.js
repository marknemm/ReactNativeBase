import { moderateScale } from 'react-native-size-matters';

/**
 * Creates general {@link Types.Styles.FormStyles form styles}.
 *
 * @param {Types.Rneui.CreateThemeOptions} themeOptions The {@link Types.Rneui.CreateThemeOptions theme options}.
 * @returns {Types.Styles.FormStyles} The {@link Types.Styles.FormStyles form styles}.
 */
export function createFormStyles(themeOptions) {
  const colors = (themeOptions.mode === 'dark')
    ? themeOptions.darkColors
    : themeOptions.lightColors;
  const fieldHeight = moderateScale(themeOptions.spacing.xl * 1.67);

  return {
    field: {
      height: fieldHeight,
    },
    fieldBorder: {
      borderBottomColor: colors.greyOutline,
      borderBottomWidth: 1,
      height: fieldHeight,
    },
    fieldContainer: {
      marginBottom: themeOptions.spacing.sm,
    },
    fieldText: {
      color: colors.black,
      fontSize: themeOptions.font.size.normal,
    },
    label: {
      color: colors.grey3,
      fontWeight: themeOptions.font.weight.bold,
      fontSize: themeOptions.font.size.normal,
    },
    placeholder: {
      color: colors.placeholder,
      fontSize: themeOptions.font.size.normal,
    },
    submitButton: {
      marginBottom: themeOptions.spacing.lg,
      marginHorizontal: themeOptions.spacing.md,
      width: 'auto',
    },
    submitError: {
      marginTop: themeOptions.spacing.md,
      textAlign: 'center',
    },
  };
}
