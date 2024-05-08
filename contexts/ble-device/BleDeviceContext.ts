import { Device } from '@util/ble-manager';
import { createContext } from 'react';

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
 * A context that provides the Bluetooth {@link Device} instance.
 */
export const BleDeviceContext: React.Context<TBleDeviceContext> = createContext(null);
