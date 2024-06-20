import type { PropsWithChildren } from 'react';
import type { Device } from 'react-native-ble-plx';
import type { BleDeviceContext } from './BleDeviceContext';
import type BleDeviceProvider from './BleDeviceProvider';

/**
 * The {@link BleDeviceContext} type.
 */
export interface TBleDeviceContext {

  /**
   * The Bluetooth {@link Device} instance.
   */
  bleDevice: Device;

  /**
   * Resets the Bluetooth {@link Device} instance.
   */
  resetBleDevice: () => void;

}

/**
 * The {@link BleDeviceProvider} component props.
 */
export interface BleDeviceProviderProps extends PropsWithChildren {

  /**
   * The Bluetooth {@link Device} instance.
   */
  device?: Device;

  /**
   * The device match callback function.
   * If {@link BleDeviceProviderProps.device} is provided, this callback is ignored.
   */
  deviceMatchCb?: (device: Device) => boolean;

}
