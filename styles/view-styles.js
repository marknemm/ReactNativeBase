import { StyleSheet } from 'react-native';

/**
 * Creates general {@link Types.Styles.ViewStyles view styles}.
 *
 * @param {Types.Rneui.CreateThemeOptions} themeOptions The {@link Types.Rneui.CreateThemeOptions theme options}.
 * @returns {Types.Styles.ViewStyles} The {@link Types.Styles.ViewStyles view styles}.
 */
export function createViewStyles(themeOptions) {
  return {
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    column: {
      flexDirection: 'column',
    },
    flexItem: {
      flex: 1,
    },
    flexEndItem: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    fullWidth: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
    },
    screenMarginHorizontal: {
      marginHorizontal: themeOptions.spacing.md,
    },
  };
}
