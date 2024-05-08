import { Device } from 'react-native-ble-plx';

/**
 * The {@link BleDevice} component properties.
 */
export interface Props {

  /**
   * The Bluetooth {@link Device}. If not given, the {@link Device} is derived from {@link BleDeviceContext}.
   */
  bleDevice?: Device;

}
