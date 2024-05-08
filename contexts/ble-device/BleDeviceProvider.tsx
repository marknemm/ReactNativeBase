import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import { useBleDevices } from '@hooks/ble-hooks';
import { Device } from '@util/ble-manager';
import { log } from '@util/log';
import { useContext, useMemo, useState } from 'react';
import { BleDeviceContext } from './BleDeviceContext';

/**
 * Provides the Bluetooth {@link Device} instance to the application or a subtree within the application.
 *
 * @param props The component {@link Props}.
 * @returns The {@link BleDeviceProvider} component.
 */
const BleDeviceProvider: React.FC<Props> = ({ children, device, deviceMatchCb }) => {
  const [bleDevice, setBleDevice] = useState(device);
  const { bleManager } = useContext(BleManagerContext);
  const bleDevices = useBleDevices();

  if (device && device.id !== bleDevice?.id) {
    if (bleDevice) bleDevice.cancelConnection();
    setBleDevice(device);
  } else if (!device && deviceMatchCb) {
    const foundDevice = bleDevices.find((d) => deviceMatchCb(d));
    if (foundDevice) {
      bleManager?.stopDeviceScan();
      setBleDevice(foundDevice);
      log('Found Bluetooth device: ', foundDevice.id, foundDevice.localName, foundDevice.name);
    } else if (bleDevice) {
      bleDevice.cancelConnection();
      setBleDevice(null);
    }
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
};

/**
 * The {@link BleDeviceProvider} component props.
 */
interface Props {

  /**
   * The children components to display in the {@link BleDeviceProvider}.
   */
  children?: React.ReactNode;

  /**
   * The Bluetooth {@link Device} instance.
   */
  device?: Device;

  /**
   * The device match callback function.
   * If {@link BleDeviceProviderProps.device} is provided, this callback is ignored.
   */
  deviceMatchCb?: (device: Device) => boolean;

}

export default BleDeviceProvider;
