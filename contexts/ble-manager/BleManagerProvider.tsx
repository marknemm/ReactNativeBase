import { BleManager } from '@util/ble-manager';
import { useEffect, useMemo, useState } from 'react';
import { BleManagerContext } from './BleManagerContext';

/**
 * Provides the {@link BleManager} instance to the application.
 */
const BleManagerProvider: React.FC<Props> = ({ children }) => {
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
}

/**
 * The {@link BleManagerProvider} component properties.
 */
interface Props {

  /**
   * The children components.
   */
  children: React.ReactNode;

}

export default BleManagerProvider;
