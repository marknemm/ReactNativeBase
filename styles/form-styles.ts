import { FormStyles } from '@interfaces/styles';
import { ThemeWithColors } from '@interfaces/theme';
import { moderateScale } from 'react-native-size-matters';

/**
 * Creates general {@link FormStyles}.
 *
 * @param theme The {@link ThemeWithColors Theme}.
 * @returns The {@link FormStyles}.
 */
export function createFormStyles(theme: ThemeWithColors): FormStyles {
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
