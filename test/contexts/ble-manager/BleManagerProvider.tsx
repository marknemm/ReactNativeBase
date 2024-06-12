import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import BleManager from '@util/ble-manager';
import { useMemo, type PropsWithChildren } from 'react';

jest.mock('@util/ble-manager');

/**
 * The singleton mock {@link BleManager} instance to provide to the test application.
 */
const mockBleManager = new BleManager();

/**
 * Provides a singleton mock {@link BleManager} instance to the test application.
 *
 * @param props The component {@link PropsWithChildren props}.
 * @returns The {@link BleManagerProvider} component.
 */
const BleManagerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const bleManagerCtx = useMemo(() => ({
    bleManager: mockBleManager,
    resetBleManager: () => {
      mockBleManager.destroy();
    },
  }), []);
  (bleManagerCtx.bleManager as any).resetDevices();

  return (
    <BleManagerContext.Provider value={bleManagerCtx}>
      { children }
    </BleManagerContext.Provider>
  );
};

export default BleManagerProvider;
