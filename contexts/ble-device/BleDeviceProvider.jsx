import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import { useBleDevices } from '@hooks/ble-hooks';
import { Device } from '@util/ble-manager';
import { log } from '@util/log';
import PropTypes from 'prop-types';
import { useContext, useMemo, useState } from 'react';
import { BleDeviceContext } from './BleDeviceContext';

/**
 * The BleDevice component.
 *
 * @param {Object} props The component props.
 * @param {React.ReactNode} props.children The children components.
 * @param {(device: Device) => boolean} [props.deviceMatchCb] The device match callback.
 * @returns {React.JSX.Element} The BleDeviceProvider component.
 */
export default function BleDeviceProvider({ children, deviceMatchCb }) {
  const [bleDevice, setBleDevice] = useState(null);
  const { bleManager } = useContext(BleManagerContext);
  const bleDevices = useBleDevices();

  const foundDevice = bleDevices.find((d) => deviceMatchCb(d));
  if (foundDevice) {
    bleManager?.stopDeviceScan();
    setBleDevice(foundDevice);
    log('Found Bluetooth device: ', foundDevice.id, foundDevice.localName, foundDevice.name);
  } else if (bleDevice) {
    bleDevice.cancelConnection();
    setBleDevice(null);
  }

  const bleDeviceCtx = useMemo(() => ({
    bleDevice,
    resetBleDevice: async () => {
      await bleDevice.cancelConnection();
      await bleDevice.connect();
    },
  }), [bleDevice]);

  return (
    <BleDeviceContext.Provider value={bleDeviceCtx}>
      { children }
    </BleDeviceContext.Provider>
  );
}

BleDeviceProvider.propTypes = {
  deviceMatchCb: PropTypes.func.isRequired,
};
