import { BleDeviceContext } from '@contexts/ble-device/BleDeviceContext';
import BleDeviceProvider, { type BleDeviceProviderProps } from '@contexts/ble-device/BleDeviceProvider';
import AppProvider from '@test/contexts/app/AppProvider';
import { renderHook } from '@testing-library/react-native';
import { genMockBleDevices, genMockBleDevice, getMockBleManager } from '@util/__mocks__/ble-manager';
import { type Device } from '@util/ble-manager';
import { useContext, type PropsWithChildren } from 'react';

describe('<BleDeviceProvider />', () => {
  let foundDevices: Map<string, Device>,
    mockBleDevice: Device;

  /**
   * Generates a wrapper component for testing.
   *
   * @param props The {@link BleDeviceProviderProps}.
   * @returns The wrapper component.
   */
  function genWrapper({
    device,
    deviceMatchCb,
  }: BleDeviceProviderProps = {}) {
    return ({ children }: PropsWithChildren) => (
      <AppProvider>
        <BleDeviceProvider
          device={device}
          deviceMatchCb={deviceMatchCb}
        >
          { children }
        </BleDeviceProvider>
      </AppProvider>
    );
  }

  beforeEach(() => {
    foundDevices = genMockBleDevices();
    mockBleDevice = genMockBleDevice();
  });

  describe('Provide BleDevice', () => {
    it('provides no BleDevice by default', () => {
      const bleDeviceCtx = renderHook(
        () => useContext(BleDeviceContext),
        { wrapper: genWrapper() }
      ).result.current;

      expect(bleDeviceCtx.bleDevice).toBeFalsy();
    });

    it('provides a BleDevice passed down from parent', () => {
      const bleDeviceCtx = renderHook(
        () => useContext(BleDeviceContext),
        { wrapper: genWrapper({ device: mockBleDevice }) }
      ).result.current;

      expect(bleDeviceCtx.bleDevice).toBe(mockBleDevice);
    });

    it('provides a BleDevice found by deviceMatchCb', () => {
      const bleDeviceCtx = renderHook(
        () => useContext(BleDeviceContext),
        {
          wrapper: genWrapper({
            deviceMatchCb: (device) => device.id === 'device-0',
          }),
        }
      ).result.current;

      expect(JSON.stringify(bleDeviceCtx.bleDevice)).toEqual(
        JSON.stringify(foundDevices.get('device-0'))
      );
    });
  });

  describe('update bleDevice', () => {
    it('updates to a new BleDevice based on deviceMatchCb update', () => {
      const mockBleManager = getMockBleManager();

      const oldMockBleDevice = genMockBleDevice({ id: 'device-old' });
      (mockBleManager.startDeviceScan as jest.Mock).mockImplementationOnce(
        (listenerCb) => { listenerCb(oldMockBleDevice); }
      );
      const deviceMatchCb = jest.fn((device) => device.id === oldMockBleDevice.id);

      const { rerender, result } = renderHook(
        () => useContext(BleDeviceContext),
        { wrapper: genWrapper({ deviceMatchCb }) }
      );
      let bleDeviceCtx = result.current;

      expect(bleDeviceCtx.bleDevice).toBe(oldMockBleDevice);

      /// Transition to new device ///

      const newMockBleDevice = genMockBleDevice({ id: 'device-new' });
      (mockBleManager.startDeviceScan as jest.Mock).mockImplementationOnce(
        (listenerCb) => { listenerCb(newMockBleDevice); }
      );
      deviceMatchCb.mockImplementation((device) => device.id === newMockBleDevice.id);

      rerender({});
      bleDeviceCtx = result.current;

      expect(bleDeviceCtx.bleDevice).toBe(newMockBleDevice);
      expect(oldMockBleDevice.cancelConnection).toHaveBeenCalled();
    });

    it('updates to no BleDevice when deviceMatchCb returns null', () => {
      const mockBleManager = getMockBleManager();

      const oldMockBleDevice = genMockBleDevice({ id: 'device-old' });
      (mockBleManager.startDeviceScan as jest.Mock).mockImplementationOnce(
        (listenerCb) => { listenerCb(oldMockBleDevice); }
      );
      const deviceMatchCb = jest.fn((device) => device.id === oldMockBleDevice.id);

      const { rerender, result } = renderHook(
        () => useContext(BleDeviceContext),
        { wrapper: genWrapper({ deviceMatchCb }) }
      );
      let bleDeviceCtx = result.current;

      expect(bleDeviceCtx.bleDevice).toBe(oldMockBleDevice);

      /// Transition to no device ///

      deviceMatchCb.mockImplementation(() => null);

      rerender({});
      bleDeviceCtx = result.current;

      expect(bleDeviceCtx.bleDevice).toBeFalsy();
      expect(oldMockBleDevice.cancelConnection).toHaveBeenCalled();
    });
  });

  describe('reset bleDevice', () => {
    it('resets the BleDevice', async () => {
      const bleDeviceCtx = renderHook(
        () => useContext(BleDeviceContext),
        { wrapper: genWrapper({ device: mockBleDevice }) }
      ).result.current;

      await bleDeviceCtx.resetBleDevice();

      expect(mockBleDevice.cancelConnection).toHaveBeenCalled();
      expect(mockBleDevice.connect).toHaveBeenCalled();
    });
  });
});
