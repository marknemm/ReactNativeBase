import type BleManager from '@util/ble-manager';
import { createContext } from 'react';

/**
 * The {@link BleManagerContext} type.
 */
export interface TBleManagerContext {

  /**
   * The {@link BleManager} instance.
   */
  bleManager: BleManager;

  /**
   * Resets the {@link BleManager} instance.
   */
  resetBleManager: () => void;

}

/**
 * A context that provides the {@link BleManager} instance.
 */
export const BleManagerContext: React.Context<TBleManagerContext> = createContext(null);
