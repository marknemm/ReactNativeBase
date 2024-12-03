import { useThemedStyles } from '@hooks/styles-hooks';
import type BleDeviceList from './BleDeviceList';

/**
 * Gets the styles for the {@link BleDeviceList} component.
 *
 * @returns The styles for the {@link BleDeviceList} component.
 */
export function useStyles() {
  return useThemedStyles((theme) => ({
    deviceListHeader: {
      alignItems: 'center',
      columnGap: theme.spacing.md,
      flexDirection: 'row',
      marginBottom: theme.spacing.sm,
      paddingStart: theme.spacing.screenHorizontal,
    },
    deviceListTitle: {
      fontSize: theme.font.size.larger,
      textDecorationLine: 'underline',
    },
    bleDeviceListItem: {
      alignItems: 'center',
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1,
      columnGap: theme.spacing.sm,
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.screenHorizontal,
      paddingVertical: theme.spacing.sm,
    },
    bleDeviceNameInfoContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      flexGrow: 1,
    },
    bleDeviceName: {
      fontSize: theme.font.size.normal,
    },
  }), []);
}
