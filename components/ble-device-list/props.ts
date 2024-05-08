import { Device } from 'react-native-ble-plx';

/**
 * The `BleDeviceList` component properties.
 */
export interface Props {

  /**
   * The title of the device list.
   */
  title?: string;

}

/**
 * The {@link BleDeviceListHeader} component properties.
 */
export interface BleDeviceListHeaderProps {

  /**
   * The title of the device list.
   */
  title: string;

}

/**
 * The {@link BleDeviceListItem} component properties.
 */
export interface BleDeviceListItemProps {

  /**
   * The Bluetooth {@link Device}.
   */
  bleDevice: Device;

}
