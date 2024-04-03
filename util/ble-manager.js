import { BleManager as _BleManager, Device, State } from 'react-native-ble-plx';
import { logErr } from './log';

export { Device, State };

/**
 * A proxy for the {@link _BleManager BleManager} class.
 */
export class BleManager {

  #bleManager = new _BleManager();

  /**
   * Waits for the {@link State.PoweredOn PoweredOn} Bluetooth state to be reached.
   *
   * @returns {Promise<void>} Promise which emits when Bluetooth is powered on.
   */
  waitForPoweredOnState() {
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
   * @param {(state: State) => void} listener Callback which emits {@link State} changes of BLE Manager.
   * Also emits current state when registered.
   * @returns {import('react-native-ble-plx').Subscription} Subscription on which remove() function can be called to unsubscribe.
   */
  onStateChange(listener) {
    return this.#bleManager.onStateChange(listener, true);
  }

  /**
   * Current, global {@link State} of a {@link BleManager}. All APIs are working only when active state is `PoweredOn`.
   *
   * @returns {Promise<State>} Promise which emits current state of BleManager.
   */
  state() {
    return this.#bleManager.state();
  }

  /**
   * Starts device scanning. When previous scan is in progress it will be stopped before executing this command.
   *
   * @param {(scannedDevice: Device) => void} listener Listener Function which will be called for every scanned Device (devices may be scanned multiple times).
   * @param {string[]?} UUIDs Array of strings containing UUIDs of Services which are registered in scanned Device. If null is passed, all available Devices will be scanned.
   * @param {import('react-native-ble-plx').ScanOptions?} options Optional configuration for scanning operation.
   */
  startDeviceScan(listener, UUIDs = null, options = { allowDuplicates: false }) {
    this.#bleManager.startDeviceScan(UUIDs, options, (err, device) => {
      if (err) {
        logErr(err);
        this.#bleManager.stopDeviceScan();
        this.startDeviceScan(listener, UUIDs, options);
      } else if (device) {
        listener(device);
      }
    });
  }

  /**
   * Stops {@link Device Device} scan if in progress.
   */
  stopDeviceScan() {
    this.#bleManager.stopDeviceScan();
  }

  /**
   * Connects to {@link Device Device} with provided ID.
   *
   * @param {string} deviceIdentifier {@link Device Device} identifier.
   * @param {import('react-native-ble-plx').ConnectionOptions | undefined} options Platform specific options for connection establishment.
   * @returns {Promise<Device>} Connected {@link Device Device} object if successful.
   */
  connectToDevice(deviceIdentifier, options = undefined) {
    return this.#bleManager.connectToDevice(deviceIdentifier, options);
  }

  /**
   * Disconnects from {@link Device Device} if it's connected or cancels pending connection.
   *
   * @param {string} deviceIdentifier {@link Device Device} identifier to be closed.
   * @returns {Promise<Device>} Closed {@link Device Device} when operation is successful.
   */
  disconnectFromDevice(deviceIdentifier) {
    return this.#bleManager.cancelDeviceConnection(deviceIdentifier);
  }

  /**
   * Destroys the {@link BleManager} instance.
   * All operations which were in progress completes with `#bleerrorcodebluetoothmanagerdestroyed`|`BluetoothManagerDestroyed` error code.
   */
  destroy() {
    this.#bleManager.destroy();
  }

}
