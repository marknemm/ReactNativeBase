import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import AppProvider from '@test/contexts/app/AppProvider';
import { stubAllMethods } from '@test/util/spy';
import { renderHook } from '@testing-library/react-native';
import { useContext } from 'react';
import { Device, State, type NativeDevice } from 'react-native-ble-plx';

/**
 * Generates a map of default mock BLE devices.
 *
 * @returns A map of default mock BLE devices.
 */
export function genMockBleDevices(): Map<string, Device> {
  return new Map<string, Device>([
    ['device-3', genMockBleDevice({ id: 'device-3', name: 'Device 3', connected: true })],
    ['device-2', genMockBleDevice({ id: 'device-2', name: 'Device 2' })],
    ['device-0', genMockBleDevice({ id: 'device-0', name: 'Device 0', localName: 'Device A' })],
    ['device-1', genMockBleDevice({ id: 'device-1', name: 'Device 1', localName: 'Device B' })],
    ['device-4', genMockBleDevice({ id: 'device-4' })],
  ]);
}

/**
 * Gets the singleton {@link BleManager} instance from the test {@link BleManagerContext}.
 *
 * @returns The singleton {@link BleManager} instance.
 */
export function getMockBleManager() {
  return renderHook(
    () => useContext(BleManagerContext),
    { wrapper: AppProvider }
  ).result.current.bleManager;
}

/**
 * The `@util/ble-manager` module mock.
 */
const BleManagerMock = jest.fn().mockImplementation(() => {
  let mockDevices = genMockBleDevices();

  return {
    getConnectedDevices: jest.fn().mockResolvedValue(mockDevices),
    waitForPoweredOnState: jest.fn().mockResolvedValue(null),
    onStateChange: jest.fn().mockImplementation((listenerCb) => {
      listenerCb?.(State.PoweredOn);
      return { remove: jest.fn() };
    }),
    state: jest.fn().mockResolvedValue(State.PoweredOn),
    startDeviceScan: jest.fn().mockImplementation((listenerCb) => {
      for (const device of mockDevices.values()) {
        listenerCb?.(device);
      }
    }),
    stopDeviceScan: jest.fn(),
    connectToDevice: jest.fn().mockImplementation((deviceIdentifier: string) => {
      const device = mockDevices.get(deviceIdentifier) ?? genMockBleDevice(deviceIdentifier);
      (device.isConnected as jest.Mock).mockResolvedValue(true);
      return Promise.resolve(device);
    }),
    disconnectFromDevice: jest.fn().mockImplementation((deviceIdentifier: string) => {
      const device = mockDevices.get(deviceIdentifier) ?? genMockBleDevice(deviceIdentifier);
      (device.isConnected as jest.Mock).mockResolvedValue(false);
      return Promise.resolve(device);
    }),
    destroy: jest.fn(),

    // Additional helper methods for manipulating the mock devices.
    mockDevices,
    resetMockDevices: () => { mockDevices = genMockBleDevices(); },
  };
});

/**
 * Generates a mock {@link Device} object.
 *
 * @param data The {@link NativeDevice} data to populate the mock {@link Device}.
 * @returns A mock {@link Device} object.
 */
export function genMockBleDevice(
  data: (Partial<NativeDevice> & { connected?: boolean }) | string | number = 0
): Device {
  const device = new Device(null, null);

  if (typeof data === 'number') {
    data = { id: `device-${data}` };
  } else if (typeof data === 'string') {
    data = { id: data };
  }

  for (const key of Object.keys(data)) {
    (device as any)[key as keyof Device] = data[key as keyof NativeDevice];
  }
  stubAllMethods(device);
  (device.isConnected as jest.Mock).mockResolvedValue(data.connected ?? false);

  return device;
}

export { Device, State };
export default BleManagerMock;
