import { BleDeviceContext } from '@contexts/ble-device/BleDeviceContext';
import BleDeviceProvider, { type BleDeviceProviderProps } from '@contexts/ble-device/BleDeviceProvider';
import AppProvider from '@test/contexts/app/AppProvider';
import { renderHook } from '@testing-library/react-native';
import { genDefaultDevices, genMockBleDevice } from '@util/__mocks__/ble-manager';
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

  const Wrapper = ({ children, device }: PropsWithChildren<any>) => (
    <AppProvider>
      <BleDeviceProvider
        device={device}
      >
        { children }
      </BleDeviceProvider>
    </AppProvider>
  );

  beforeEach(() => {
    foundDevices = genDefaultDevices();
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
    it('updates to a new BleDevice passed down from parent', () => {
      const { rerender, result } = renderHook(
        () => useContext(BleDeviceContext),
        { wrapper: Wrapper, initialProps: { device: mockBleDevice } }
      );
      const bleDeviceCtx = result.current;

      expect(bleDeviceCtx.bleDevice).toBe(mockBleDevice);

      const newMockBleDevice = genMockBleDevice(1);
      rerender({ device: newMockBleDevice });

      expect(bleDeviceCtx.bleDevice).toBe(newMockBleDevice);
    });
  });
});
