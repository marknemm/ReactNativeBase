import type BleManager from '@util/ble-manager';
import type { BleManagerContext } from './BleManagerContext';

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
