import type { Device } from 'react-native-ble-plx';
import type BleDeviceList from './BleDeviceList';

/**
 * The {@link BleDeviceList} component properties.
 */
export interface BleDeviceListProps {

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
