import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import { Device, State } from '@util/ble-manager';
import { log } from '@util/log';
import { useContext, useEffect, useState } from 'react';

/**
 * Custom hook that gets the current Bluetooth {@link State}.
 *
 * @returns The current Bluetooth {@link State}.
 */
export function useBleState(): State
{
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
 * Custom hook that gets the list of detected Bluetooth {@link Device} objects.
 *
 * @returns The list of detected Bluetooth {@link Device} objects.
 */
export function useBleDevices(): Device[]
{
  const [bleDevices, setBleDevices] = useState([]);
  const { bleManager } = useContext(BleManagerContext);
  const bleState = useBleState();

  useEffect(() => {
    setBleDevices([]);

    // Only attempt to scan for devices when Bluetooth is powered on.
    if (bleManager && bleState === State.PoweredOn) {
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
    }

    return () => bleManager.stopDeviceScan();
  }, [bleManager, bleState]);

  return bleDevices;
}
