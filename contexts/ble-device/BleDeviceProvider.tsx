import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import { useBleDevices } from '@hooks/ble-hooks';
import { Device } from '@util/ble-manager';
import { log } from '@util/log';
import { useContext, useMemo, useState } from 'react';
import { BleDeviceContext } from './BleDeviceContext';
import type { BleDeviceProviderProps } from './BleDeviceProvider.interfaces';

/**
 * Provides the Bluetooth {@link Device} instance to the application or a subtree within the application.
 *
 * @param props The component {@link BleDeviceProviderProps}.
 * @returns The {@link BleDeviceProvider} component.
 */
const BleDeviceProvider: React.FC<BleDeviceProviderProps> = ({
  children,
  device,
  deviceMatchCb,
}) => {
  const [bleDevice, setBleDevice] = useState(device);
  const { bleManager } = useContext(BleManagerContext);
  const bleDevices = useBleDevices();

  if (device && device.id !== bleDevice?.id) {
    if (bleDevice) bleDevice.cancelConnection();
    setBleDevice(device);
  } else if (!device && deviceMatchCb) {
    const foundDevice = bleDevices.find((d) => deviceMatchCb(d));
    if (foundDevice && foundDevice.id !== bleDevice?.id) {
      bleManager?.stopDeviceScan();
      setBleDevice(foundDevice);
      log('Found Bluetooth device: ', foundDevice.id, foundDevice.localName, foundDevice.name);
    } else if (!foundDevice && bleDevice) {
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

export type * from './BleDeviceProvider.interfaces';
export default BleDeviceProvider;
