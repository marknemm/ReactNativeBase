import { moderateScale } from 'react-native-size-matters';

/**
 * Creates general {@link Types.Styles.FormStyles form styles}.
 *
 * @param {Types.Theme.ThemeWithColors} theme The {@link Types.Theme.ThemeWithColors Theme}.
 * @returns {Types.Styles.FormStyles} The {@link Types.Styles.FormStyles form styles}.
 */
export function createFormStyles(theme) {
  const fieldHeight = moderateScale(theme.spacing.xl * 1.67);

  return {
    field: {
      height: fieldHeight,
    },
    fieldBorder: {
      borderBottomColor: theme.colors.greyOutline,
      borderBottomWidth: 1,
      height: fieldHeight,
    },
    fieldContainer: {
      marginBottom: theme.spacing.sm,
      paddingHorizontal: 0,
    },
    fieldText: {
      color: theme.colors.black,
      fontSize: theme.font.size.normal,
    },
    label: {
      color: theme.colors.grey3,
      fontWeight: theme.font.weight.bold,
      fontSize: theme.font.size.normal,
    },
    placeholder: {
      color: theme.colors.placeholder,
      fontSize: theme.font.size.normal,
    },
    submitButton: {
      marginBottom: theme.spacing.lg,
      width: 'auto',
    },
    submitError: {
      marginTop: theme.spacing.md,
      textAlign: 'center',
    },
  };
}
