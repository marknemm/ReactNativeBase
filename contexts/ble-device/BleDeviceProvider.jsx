import { useBleDevice } from '@hooks/ble-hooks';
import { Device } from '@util/ble-manager';
import PropTypes from 'prop-types';
import { BleDeviceContext } from './BleDeviceContext';

/**
 * The BleProvider component.
 *
 * @param {Object} param0 The component props.
 * @param {React.ReactNode} param0.children The children components.
 * @param {(device: Device) => boolean} [param0.deviceMatchCb] The device match callback.
 * @returns {React.JSX.Element} The BleProvider component.
 */
export default function BleManagerProvider({ children, deviceMatchCb }) {
  const device = useBleDevice(deviceMatchCb);

  return (
    <BleDeviceContext.Provider value={device}>
      { children }
    </BleDeviceContext.Provider>
  );
}

BleManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  deviceMatchCb: PropTypes.func.isRequired,
};
