import { BleManager } from '@util/ble-manager';
import { createContext } from 'react';

/**
 * A context that provides the {@link BleManager} instance.
 *
 * @type {React.Context<{ bleManager: BleManager, resetBleManager: () => void }>}
 */
export const BleManagerContext = createContext(null);
