import type { Device } from 'react-native-ble-plx';
import type BleDevice from './BleDevice';

/**
 * The {@link BleDevice} component properties.
 */
export interface BleDeviceProps {

  /**
   * The Bluetooth {@link Device}. If not given, the {@link Device} is derived from {@link BleDeviceContext}.
   */
  bleDevice?: Device;

}
