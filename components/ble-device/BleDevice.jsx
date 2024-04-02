import { BleDeviceContext } from '@contexts/ble-device/BleDeviceContext';
import { excludePrivateFields } from '@util/json';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Text } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

/**
 * The Bluetooth device component.
 *
 * @param {Object} param0 The component properties.
 * @param {Device} [param0.bleDevice] The Bluetooth device. If not given, the device is derived from `BleDeviceContext`.
 * @returns {React.JSX.Element} The Bluetooth device component.
 */
export default function BleDevice({ bleDevice }) {
  const bleDeviceCtx = useContext(BleDeviceContext);
  bleDevice = bleDevice ?? bleDeviceCtx.bleDevice;
  const bleDeviceJSON = JSON.stringify(bleDevice, excludePrivateFields, 3);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Bluetooth Device: {bleDeviceJSON}</Text>
    </SafeAreaView>
  );
}

BleDevice.propTypes = {
  bleDevice: PropTypes.instanceOf(Device),
};
