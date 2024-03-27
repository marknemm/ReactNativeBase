import { Device } from '@util/ble-manager';
import { createContext } from 'react';

/**
 * A context that provides the Bluetooth {@link Device} instance.
 *
 * @type {React.Context<Device>}
 */
export const BleDeviceContext = createContext(null);
