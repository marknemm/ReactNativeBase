import { BleManager } from '@util/ble-manager';
import { useEffect, useMemo, useState } from 'react';
import { BleManagerContext } from './BleManagerContext';

/**
 * The BleProvider component.
 *
 * @param {Object} props The component props.
 * @param {React.ReactNode} props.children The children components.
 * @returns {React.JSX.Element} The BleProvider component.
 */
export default function BleManagerProvider({ children }) {
  const [bleManager, setBleManager] = useState(() => new BleManager());

  // Destroy the BleManager instance when the component is unmounted.
  // Will call destroy on initial instance, but that will affect the current instance.
  useEffect(() => () => bleManager.destroy(), []);

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
