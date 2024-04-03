import { ExpansionPanel } from '@components/expansion-panel/ExpansionPanel';
import { BleDeviceContext } from '@contexts/ble-device/BleDeviceContext';
import { Text } from '@rneui/themed';
import { excludePrivateFields } from '@util/json';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Device } from 'react-native-ble-plx';

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
    <ScrollView>
      <Text>ID: {bleDevice.id}</Text>
      <Text>Name: {bleDevice.name ?? ''}</Text>
      <Text>Local Name: {bleDevice.localName ?? ''}</Text>

      <ExpansionPanel title="More Info">
        <Text>Bluetooth Device: {bleDeviceJSON}</Text>
      </ExpansionPanel>
    </ScrollView>
  );
}

BleDevice.propTypes = {
  bleDevice: PropTypes.instanceOf(Device),
};
