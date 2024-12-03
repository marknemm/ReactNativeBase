import { type Device } from '@util/ble-manager';
import { createContext } from 'react';
import type { TBleDeviceContext } from './BleDeviceContext.interfaces';

/**
 * A context that provides the Bluetooth {@link Device} instance.
 */
export const BleDeviceContext: React.Context<TBleDeviceContext> = createContext(null);

export type * from './BleDeviceContext.interfaces';
