import { BleManager as NativeBleManager, ConnectionOptions, Device, ScanOptions, State, Subscription } from 'react-native-ble-plx';
import { logErr } from './log';
import { getPairedDeviceIds, isDevicePaired, pushPairedDevice, removePairedDevice } from './paired-device-storage';

export { Device, State };

/**
 * A proxy for the {@link NativeBleManager BleManager} class.
 */
export default class BleManager {

  #bleManager = new NativeBleManager();

  #connectedDevices = new Map<string, Device>();

  #connectedDevicesPromise: Promise<Map<string, Device>> = this.#reconnectDevices().catch((err) => {
    logErr(err);
    return this.#connectedDevices;
  });

  // Private setup methods //

  /**
   * Reconnects to all paired devices.
   *
   * @returns Promise which emits when all paired devices are reconnected.
   */
  async #reconnectDevices(): Promise<Map<string, Device>> {
    const pairedDeviceIds = getPairedDeviceIds();
    await this.waitForPoweredOnState();

    for (const deviceId of pairedDeviceIds) {
      try {
        await this.connectToDevice(deviceId);
      } catch (err) {
        logErr(err);
      }
    }

    return this.#connectedDevices;
  }

  // Public methods //

  /**
   * Gets the connected devices.
   *
   * @returns Promise which emits a map of connected devices.
   */
  async getConnectedDevices(): Promise<Map<string, Device>> {
    return this.#connectedDevicesPromise;
  }

  /**
   * Waits for the {@link State.PoweredOn PoweredOn} Bluetooth state to be reached.
   *
   * @returns Promise which emits when Bluetooth is powered on.
   */
  async waitForPoweredOnState(): Promise<void> {
    return new Promise((resolve) => {
      const subscription = this.onStateChange((state) => {
        if (state === State.PoweredOn) {
          subscription.remove();
          resolve();
        }
      });
    });
  }

  // Proxy methods //

  /**
   * Notifies about {@link State} changes of a {@link BleManager}.
   *
   * @param listener Callback which emits {@link State} changes of BLE Manager.
   * Also emits current state when registered.
   * @returns Subscription on which remove() function can be called to unsubscribe.
   */
  onStateChange(listener: (state: State) => void): Subscription {
    return this.#bleManager.onStateChange(listener, true);
  }

  /**
   * Current, global {@link State} of a {@link BleManager}. All APIs are working only when active state is `PoweredOn`.
   *
   * @returns Promise which emits current {@link State} of {@link BleManager}.
   */
  async state(): Promise<State> {
    return this.#bleManager.state();
  }

  /**
   * Starts device scanning. When previous scan is in progress it will be stopped before executing this command.
   *
   * @param listener Listener Function which will be called for every scanned Device (devices may be scanned multiple times).
   * @param UUIDs Array of strings containing UUIDs of Services which are registered in scanned Device. If null is passed, all available Devices will be scanned.
   * @param options Optional configuration for scanning operation.
   */
  startDeviceScan(
    listener: (scannedDevice: Device) => void,
    UUIDs: string[] = [],
    options: ScanOptions = { allowDuplicates: false }
  ) {
    this.#bleManager.startDeviceScan(UUIDs, options, async (err, device) => {
      if (err) {
        logErr(err);
        this.startDeviceScan(listener, UUIDs, options); // Must restart on error, will stop any previous scan
      } else if (device) {
        const isPaired = isDevicePaired(device.id);
        if (isPaired && !await device.isConnected()) {
          await this.getConnectedDevices(); // Ensure connected devices are up-to-date
        }
        listener(device);
      }
    });
  }

  /**
   * Stops {@link Device} scan if in progress.
   */
  stopDeviceScan() {
    this.#bleManager.stopDeviceScan();
  }

  /**
   * Connects to {@link Device} with provided ID.
   * Also, discovers all services and characteristics of the {@link Device}.
   *
   * @param deviceIdentifier {@link Device} identifier.
   * @param options Platform specific options for connection establishment.
   * @returns Promise that resolves to the connected {@link Device} object if successful.
   */
  async connectToDevice(deviceIdentifier: string, options: ConnectionOptions = {}): Promise<Device> {
    const device = await this.#bleManager.connectToDevice(deviceIdentifier, options);
    if (device) {
      this.#connectedDevices.set(deviceIdentifier, device);
      pushPairedDevice(deviceIdentifier);
      await device.discoverAllServicesAndCharacteristics();
    }
    return device;
  }

  /**
   * Disconnects from {@link Device} if it's connected or cancels pending connection.
   *
   * @param deviceIdentifier {@link Device} identifier to be closed.
   * @returns Promise that resolves to the closed {@link Device} when operation is successful.
   */
  async disconnectFromDevice(deviceIdentifier: string): Promise<Device> {
    this.#connectedDevices.delete(deviceIdentifier);
    removePairedDevice(deviceIdentifier);
    return this.#bleManager.cancelDeviceConnection(deviceIdentifier);
  }

  /**
   * Destroys the {@link BleManager} instance.
   * All operations which were in progress completes with `#bleerrorcodebluetoothmanagerdestroyed`|`BluetoothManagerDestroyed` error code.
   */
  destroy() {
    this.#bleManager.destroy();
    this.#connectedDevices.clear();
  }

}
