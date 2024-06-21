import { useBleDeviceScan } from '@hooks/ble-hooks';
import { Device } from '@util/ble-manager';
import { useMemo, useState } from 'react';
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
  const foundDevice = useBleDeviceScan(deviceMatchCb);
  const [bleDevice, setBleDevice] = useState(device);

  if (!device && foundDevice) {
    device = foundDevice;
  }

  if (device && device.id !== bleDevice?.id) {
    bleDevice?.cancelConnection();
    setBleDevice(device);
  } else if (!device && bleDevice) {
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
};

export type * from './BleDeviceProvider.interfaces';
export default BleDeviceProvider;
