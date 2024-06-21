import BleManager from '@util/ble-manager';
import { useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { BleManagerContext } from './BleManagerContext';

/**
 * Provides the {@link BleManager} instance to the application.
 *
 * @param props The component {@link PropsWithChildren Props}.
 * @returns The {@link BleManagerProvider} component.
 */
const BleManagerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [bleManager, setBleManager] = useState(() => new BleManager());

  // Destroy the BleManager instance when the component is unmounted.
  // Will call destroy on initial instance, but that will affect the current instance.
  useEffect(() => () => bleManager.destroy(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const bleManagerCtx = useMemo(() => ({
    bleManager,
    resetBleManager: () => {
      bleManager.destroy();
      setBleManager(new BleManager());
    },
  }), [bleManager]);

  return (
    <BleManagerContext.Provider value={bleManagerCtx}>
      { children }
    </BleManagerContext.Provider>
  );
};

export type * from './BleManagerContext.interfaces';
export default BleManagerProvider;
