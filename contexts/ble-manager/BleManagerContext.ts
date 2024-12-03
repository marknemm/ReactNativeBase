import type BleManager from '@util/ble-manager';
import { createContext } from 'react';
import type { TBleManagerContext } from './BleManagerContext.interfaces';

/**
 * A context that provides the {@link BleManager} instance.
 */
export const BleManagerContext: React.Context<TBleManagerContext> = createContext(null);

export type * from './BleManagerContext.interfaces';
