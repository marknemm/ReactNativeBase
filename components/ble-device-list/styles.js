import { StyleSheet } from 'react-native';

/**
 * The styles for the Bluetooth device component.
 */
export const styles = StyleSheet.create({
  container: {},
  deviceListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 10,
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
});
