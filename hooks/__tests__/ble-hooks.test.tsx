import BleDeviceProvider from '@contexts/ble-device/BleDeviceProvider';
import { useBleDevice, useBleDeviceScan, useBleDevicesScan, useBleState } from '@hooks/ble-hooks';
import AppProvider from '@test/contexts/app/AppProvider';
import { act, renderHook } from '@testing-library/react-native';
import { genMockBleDevice, getMockBleManager } from '@util/__mocks__/ble-manager';
import BleManager, { Device, State } from '@util/ble-manager';

describe('ble-hooks', () => {
  describe('useBleDevice', () => {
    it('should resolve ble device from surrounding context', () => {
      const expectedDevice = genMockBleDevice();
      const device = renderHook(
        () => useBleDevice(),
        {
          wrapper: ({ children }) => (
            <AppProvider>
              <BleDeviceProvider device={expectedDevice}>
                {children}
              </BleDeviceProvider>
            </AppProvider>
          ),
        }
      ).result.current;

      expect(device).toBe(expectedDevice);
    });
  });

  describe('useBleDeviceScan', () => {
    let mockBleManager: BleManager,
      fireStartDeviceScan: (device: Device) => void;

    beforeEach(() => {
      mockBleManager = getMockBleManager();
      (mockBleManager.startDeviceScan as jest.Mock).mockImplementationOnce((listener) => {
        fireStartDeviceScan = listener; // Simulate additional scanning
        listener(genMockBleDevice());
      });
      (mockBleManager.stopDeviceScan as jest.Mock).mockImplementationOnce(() => {
        fireStartDeviceScan = () => {}; // Simulate stop scanning
      });
    });

    it('should scan for a device', () => {
      const device = renderHook(
        () => useBleDeviceScan((d) => d.id === 'no-find'),
        { wrapper: AppProvider }
      ).result.current;

      expect(device).toBeFalsy();
      expect(mockBleManager.startDeviceScan).toHaveBeenCalledTimes(1);
      expect(mockBleManager.stopDeviceScan).not.toHaveBeenCalled();
    });

    it('should scan for an existing device until it is found', () => {
      const deviceToFind = genMockBleDevice(1);

      const { result } = renderHook(
        () => useBleDeviceScan((d) => d.id === deviceToFind.id),
        { wrapper: AppProvider }
      );

      expect(result.current).toBeFalsy();

      act(() => fireStartDeviceScan(deviceToFind));

      expect(result.current).toBe(deviceToFind);
      expect(mockBleManager.stopDeviceScan).toHaveBeenCalledTimes(1);
    });
  });

  describe('useBleDevicesScan', () => {
    let mockBleManager: BleManager,
      initState: State,
      fireOnStateChange: (state: State) => void,
      fireStartDeviceScan: (device: Device) => void;

    beforeEach(() => {
      mockBleManager = getMockBleManager();
      initState = State.PoweredOn;
      (mockBleManager.onStateChange as jest.Mock).mockImplementationOnce((listener) => {
        fireOnStateChange = listener;
        listener(initState);
      });
      (mockBleManager.startDeviceScan as jest.Mock).mockImplementationOnce((listener) => {
        fireStartDeviceScan = listener; // Simulate additional scanning
        for (const device of (mockBleManager as any).mockDevices.values()) {
          listener(device);
        }
      });
      (mockBleManager.stopDeviceScan as jest.Mock).mockImplementationOnce(() => {
        fireStartDeviceScan = () => {}; // Simulate stop scanning
      });
    });

    it('should scan for devices if BLE is powered on', () => {
      const devices = renderHook(
        () => useBleDevicesScan(),
        { wrapper: AppProvider }
      ).result.current;

      expect(mockBleManager.startDeviceScan).toHaveBeenCalledTimes(1);
      expect(devices).toHaveLength((mockBleManager as any).mockDevices.size);
      for (const device of devices) {
        expect(device.id).toEqual((mockBleManager as any).mockDevices.get(device.id).id);
      }
    });

    it('should not start scan for devices if BLE is powered off', () => {
      initState = State.PoweredOff;

      const { result } = renderHook(
        () => useBleDevicesScan(),
        { wrapper: AppProvider }
      );

      expect(mockBleManager.startDeviceScan).not.toHaveBeenCalled();
      expect(result.current).toHaveLength(0);
    });

    it('should stop scanning for and clear devices if BLE is powered off', () => {
      const { result } = renderHook(
        () => useBleDevicesScan(),
        { wrapper: AppProvider }
      );

      expect(result.current).toHaveLength((mockBleManager as any).mockDevices.size);

      act(() => fireOnStateChange(State.PoweredOff));

      expect(mockBleManager.startDeviceScan).toHaveBeenCalledTimes(1);
      expect(mockBleManager.stopDeviceScan).toHaveBeenCalledTimes(1);
      expect(result.current).toHaveLength(0);
    });

    it('should not start scanning for devices if scanUntil callback returns true', () => {
      const scanUntil = jest.fn().mockReturnValue(true);

      const { result } = renderHook(
        () => useBleDevicesScan(scanUntil),
        { wrapper: AppProvider }
      );

      expect(mockBleManager.startDeviceScan).not.toHaveBeenCalledTimes(1);
      expect(scanUntil).toHaveBeenCalledTimes(1);
      expect(result.current).toHaveLength(0);
    });

    it('should stop scanning for devices if scanUntil callback returns true', () => {
      const scanUntil = jest.fn().mockImplementation(
        (devices) => devices.length >= (mockBleManager as any).mockDevices.size + 2
      );

      const { result } = renderHook(
        () => useBleDevicesScan(scanUntil),
        { wrapper: AppProvider }
      );

      expect(mockBleManager.startDeviceScan).toHaveBeenCalledTimes(1);
      expect(result.current).toHaveLength((mockBleManager as any).mockDevices.size);

      act(() => fireStartDeviceScan(genMockBleDevice((mockBleManager as any).mockDevices.size + 1)));

      expect(result.current).toHaveLength((mockBleManager as any).mockDevices.size + 1);

      act(() => fireStartDeviceScan(genMockBleDevice((mockBleManager as any).mockDevices.size + 2)));

      expect(result.current).toHaveLength((mockBleManager as any).mockDevices.size + 2);
      expect(mockBleManager.startDeviceScan).toHaveBeenCalledTimes(1);
      expect(mockBleManager.stopDeviceScan).toHaveBeenCalledTimes(1);

      act(() => fireStartDeviceScan(genMockBleDevice((mockBleManager as any).mockDevices.size + 3)));
      expect(result.current).toHaveLength((mockBleManager as any).mockDevices.size + 2);
    });

    it('should not add duplicate devices to the list', () => {
      const { result } = renderHook(
        () => useBleDevicesScan(),
        { wrapper: AppProvider }
      );

      expect(result.current).toHaveLength((mockBleManager as any).mockDevices.size);

      act(() => fireStartDeviceScan((mockBleManager as any).mockDevices.get('device-0')));

      expect(result.current).toHaveLength((mockBleManager as any).mockDevices.size);
    });
  });

  describe('useBleState', () => {
    let mockBleManager: BleManager,
      fireOnStateChange: (state: State) => void,
      unsubscribeOnStateChange: () => void;

    beforeEach(() => {
      mockBleManager = getMockBleManager();
      (mockBleManager.onStateChange as jest.Mock).mockImplementationOnce((listener) => {
        fireOnStateChange = listener;
        unsubscribeOnStateChange = jest.fn();
        return { remove: unsubscribeOnStateChange };
      });
    });

    it('should initialize state to Unknown', () => {
      const state = renderHook(
        () => useBleState(),
        { wrapper: AppProvider }
      ).result.current;

      expect(state).toBe(State.Unknown);
    });

    it('should update state when BLE state changes', () => {
      const { result } = renderHook(
        () => useBleState(),
        { wrapper: AppProvider }
      );

      expect(result.current).toBe(State.Unknown);

      act(() => fireOnStateChange(State.PoweredOn));

      expect(result.current).toBe(State.PoweredOn);
    });

    it('should remove listener when unmounted', () => {
      const { unmount } = renderHook(
        () => useBleState(),
        { wrapper: AppProvider }
      );

      unmount();

      expect(unsubscribeOnStateChange).toHaveBeenCalledTimes(1);
    });
  });
});
