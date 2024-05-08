import { ViewStyles } from '@interfaces/styles';
import { ThemeWithColors } from '@interfaces/theme';

/**
 * Creates general {@link ViewStyles}.
 *
 * @param theme The {@link ThemeWithColors Theme}.
 * @returns The {@link ViewStyles}.
 */
export function createViewStyles(theme: ThemeWithColors): ViewStyles {
  return {
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    column: {
      flexDirection: 'column',
    },
    flexItem1: {
      flex: 1,
    },
    flexItem2: {
      flex: 2,
    },
    flexItem3: {
      flex: 3,
    },
    flexItem4: {
      flex: 4,
    },
    flexItem5: {
      flex: 5,
    },
    flexItem6: {
      flex: 6,
    },
    flexEndItem: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    fullWidth: {
      marginLeft: -theme.spacing.screenHorizontal,
      marginRight: -theme.spacing.screenHorizontal,
    },
    noMargin: {
      marginBottom: 0,
      marginHorizontal: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginVertical: 0,
    },
    noMarginBottom: {
      marginBottom: 0,
    },
    noMarginHorizontal: {
      marginLeft: 0,
      marginHorizontal: 0,
      marginRight: 0,
    },
    noMarginLeft: {
      marginLeft: 0,
    },
    noMarginRight: {
      marginRight: 0,
    },
    noMarginTop: {
      marginTop: 0,
    },
    noMarginVertical: {
      marginBottom: 0,
      marginTop: 0,
      marginVertical: 0,
    },
    noPadding: {
      padding: 0,
      paddingBottom: 0,
      paddingHorizontal: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingVertical: 0,
    },
    noPaddingBottom: {
      paddingBottom: 0,
    },
    noPaddingHorizontal: {
      paddingLeft: 0,
      paddingHorizontal: 0,
      paddingRight: 0,
    },
    noPaddingLeft: {
      paddingLeft: 0,
    },
    noPaddingRight: {
      paddingRight: 0,
    },
    noPaddingTop: {
      paddingTop: 0,
    },
    noPaddingVertical: {
      paddingBottom: 0,
      paddingTop: 0,
      paddingVertical: 0,
    },
    row: {
      flexDirection: 'row',
    },
  };
}
