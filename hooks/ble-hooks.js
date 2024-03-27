import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import { Device, State } from '@util/ble-manager';
import { log } from '@util/log';
import { useContext, useEffect, useState } from 'react';

/**
 * A custom hook that returns the current Bluetooth state.
 *
 * @returns {State} The current Bluetooth {@link State}.
 */
export function useBleState() {
  const [bleState, setBleState] = useState(State.Unknown);
  const bleManager = useContext(BleManagerContext);

  useEffect(() => {
    const subscription = bleManager.onStateChange((state) => {
      log('Bluetooth state changed:', state);
      setBleState(state);
    });
    return () => subscription.remove();
  }, [bleManager]);

  return bleState;
}

/**
 * A custom hook that returns the Bluetooth device that matches the callback.
 *
 * @param {(device: Device) => boolean} deviceMatchCb The callback to match the device.
 * @returns {Device} The Bluetooth {@link Device} that matches the callback.
 */
export function useBleDevice(deviceMatchCb) {
  const [bleDevice, setBleDevice] = useState(null);
  const bleManager = useContext(BleManagerContext);
  const bleState = useBleState();

  // TODO: useEffectEvent with deviceMatchCb when better supported.

  useEffect(() => {
    // Only attempt to scan for devices when Bluetooth is powered on.
    if (bleState === State.PoweredOn) {
      log('Starting Bluetooth device scan');
      bleManager.startDeviceScan((device) => {
        log(device.id, device.localName, device.name);
        if (deviceMatchCb(device)) {
          bleManager.stopDeviceScan();
          setBleDevice(device);
          log('Found Bluetooth device: ', device.id, device.localName, device.name);
        }
      });
    } else if (bleDevice) {
      bleDevice.cancelConnection();
      setBleDevice(null);
    }

    return () => bleManager.stopDeviceScan();
  }, [bleManager, bleState]);

  return bleDevice;
}
