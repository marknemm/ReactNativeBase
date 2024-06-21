import { BleDeviceContext } from '@contexts/ble-device/BleDeviceContext';
import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import type BleManager from '@util/ble-manager';
import { State, type Device } from '@util/ble-manager';
import { log } from '@util/log';
import { useContext, useEffect, useMemo, useState } from 'react';

/**
 * Custom hook that gets the current Bluetooth {@link State}.
 *
 * @returns The current Bluetooth {@link State}.
 */
export function useBleState(): State {
  const [bleState, setBleState] = useState(State.Unknown);
  const { bleManager } = useContext(BleManagerContext);

  useEffect(() => {
    setBleState(State.Unknown);

    const subscription = bleManager?.onStateChange((state) => {
      log('Bluetooth state changed:', state);
      setBleState(state);
    });

    return () => subscription?.remove();
  }, [bleManager]);

  return bleState;
}

/**
 * Custom hook that gets the current Bluetooth {@link Device} object from the {@link BleDeviceContext}.
 *
 * @returns The current Bluetooth {@link Device} object.
 */
export function useBleDevice(): Device | null {
  const { bleDevice } = useContext(BleDeviceContext);
  return bleDevice;
}

/**
 * Custom hook that gets a Bluetooth {@link Device} object.
 *
 * Will get the current {@link BleDeviceContext} value if no {@link deviceMatchCb} is given.
 * If a {@link deviceMatchCb} is given, will scan for devices until a matching {@link Device} is found.
 *
 * Will continuously scan for devices until either Bluetooth is powered off,
 * the hook is unmounted, the {@link BleManager.stopDeviceScan} method is called,
 * or the {@link Device} is found.
 *
 * @param deviceMatchCb The callback to determine if a {@link Device} is a match.
 * @returns The detected Bluetooth {@link Device} object.
 */
export function useBleDeviceScan(deviceMatchCb: (device: Device) => boolean): Device | null {
  const bleDevices = useBleDevicesScan((devices) => !deviceMatchCb || !!devices.find(deviceMatchCb));

  return useMemo(() =>
    (deviceMatchCb
      ? bleDevices.find(deviceMatchCb)
      : null),
  [bleDevices, deviceMatchCb]);
}

/**
 * Custom hook that scans for a list of Bluetooth {@link Device} objects.
 *
 * Will continuously scan for devices until either {@link scanUntil} resolves to `false`,
 * Bluetooth is powered off, the hook is unmounted, or the {@link BleManager.stopDeviceScan} method is called.
 *
 * @param scanUntil The optional callback to determine when to stop scanning.
 * If not given, scans indefinitely.
 * @returns The list of detected Bluetooth {@link Device} objects.
 */
export function useBleDevicesScan(scanUntil: (devices: Device[]) => boolean = () => false): Device[] {
  const [bleDevices, setBleDevices] = useState([]);
  const { bleManager } = useContext(BleManagerContext);
  const bleState = useBleState();

  if (bleState !== State.PoweredOn && bleDevices.length > 0) {
    setBleDevices([]);
  }
  const canScan = bleManager && bleState === State.PoweredOn && !scanUntil(bleDevices);

  useEffect(() => {
    if (canScan) {
      log('Starting Bluetooth device scan');
      bleManager.startDeviceScan((device) => {
        setBleDevices((devices) => {
          if (!devices.some((d) => d.id === device.id)) {
            log(device.id, device.localName, device.name);
            return [...devices, device];
          }
          return devices;
        });
      });

      return () => bleManager.stopDeviceScan();
    }

    return undefined;
  }, [bleManager, canScan]);

  return bleDevices;
}
