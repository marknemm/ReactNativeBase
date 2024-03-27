import { BleManager } from '@util/ble-manager';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { BleManagerContext } from './BleManagerContext';

/**
 * The BleProvider component.
 *
 * @param {Object} param0 The component props.
 * @param {React.ReactNode} param0.children The children components.
 * @returns {React.JSX.Element} The BleProvider component.
 */
export default function BleManagerProvider({ children }) {
  const [bleManager] = useState(() => new BleManager());

  useEffect(() => () => bleManager.destroy(), [bleManager]);

  return (
    <BleManagerContext.Provider value={bleManager}>
      { children }
    </BleManagerContext.Provider>
  );
}

BleManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
