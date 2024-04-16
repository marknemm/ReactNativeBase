import { makeStyles } from '@rneui/themed';

/**
 * Gets the styles for the `BleDeviceList` component.
 */
export const useStyles = makeStyles(() => ({
  deviceListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 10,
    paddingStart: 10,
  },
  deviceListTitle: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  bleDeviceListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  bleDeviceNameInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  bleDeviceName: {
    fontSize: 16,
  },
}));
