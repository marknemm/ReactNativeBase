/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';

/**
 * Gets the styles for the `BleDeviceList` component.
 *
 * @returns The styles for the `BleDeviceList` component.
 */
export function useStyles() {
  return useThemedStyles((theme) => ({
    deviceListHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      paddingStart: theme.spacing.sm,
    },
    deviceListTitle: {
      fontSize: theme.font.size.larger,
      textDecorationLine: 'underline',
    },
    bleDeviceListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: theme.spacing.sm,
      padding: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    bleDeviceNameInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
    },
    bleDeviceName: {
      fontSize: theme.font.size.normal,
    },
  }), []);
}
