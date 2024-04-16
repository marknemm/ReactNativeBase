import BleDevice from '@components/ble-device/BleDevice';
import BleState from '@components/ble-state/BleState';
import InfoButton from '@components/info-button/InfoButton';
import RefreshButton from '@components/refresh-button/RefreshButton';
import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import { useBleDevices } from '@hooks/ble-hooks';
import { Button, Text } from '@rneui/themed';
import { Device } from '@util/ble-manager';
import { logErr } from '@util/log';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useStyles } from './styles';

/**
 * The Bluetooth device list component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} [param0.title='Detected Devices'] The title of the device list.
 * @returns {React.JSX.Element} The Bluetooth device list component.
 */
export default function BleDeviceList({ title = 'Detected Devices' }) {
  const bleDevices = useBleDevices();
  const availableBleDevices = bleDevices.filter(
    (d) => d.localName || d.name
  ).sort(
    (a, b) => (a.localName ?? a.name).localeCompare(b.localName ?? b.name)
  );

  return (
    <View>
      <FlatList
        ListHeaderComponent={<BleDeviceListHeader title={title} />}
        ListEmptyComponent={<Text>No devices found</Text>}
        data={availableBleDevices}
        renderItem={({ item }) => <BleDeviceListItem bleDevice={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

/**
 * The Bluetooth device list header component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} param0.title The title of the device list.
 * @returns {React.JSX.Element} The Bluetooth device list header component.
 */
function BleDeviceListHeader({ title }) {
  const styles = useStyles();
  const { resetBleManager } = useContext(BleManagerContext);

  return (
    <View style={styles.deviceListHeader}>
      <Text style={styles.deviceListTitle}>{ title }</Text>
      <BleState />
      <RefreshButton onPress={() => resetBleManager()} />
    </View>
  );
}

/**
 * The Bluetooth device list item component.
 *
 * @param {Object} param0 The component properties.
 * @param {Device} param0.bleDevice The Bluetooth {@link Device}.
 * @returns {React.JSX.Element} The Bluetooth device list item component.
 */
function BleDeviceListItem({ bleDevice }) {
  const styles = useStyles();
  const { bleManager } = useContext(BleManagerContext);
  const [bleDeviceConnected, setBleDeviceConnected] = useState(null);
  const connectToggleTitle = bleDeviceConnected ? 'Disconnect' : 'Connect';
  const connectToggleLoading = bleDeviceConnected === null;

  useEffect(() => {
    // eslint-disable-next-line no-floating-promise/no-floating-promise
    (async () => {
      setBleDeviceConnected(await bleDevice.isConnected());
    })();
  }, [bleDevice]);

  async function toggleBleDeviceConnection() {
    try {
      setBleDeviceConnected(null); // Trigger button loading state.
      await (bleDeviceConnected
        ? bleManager.disconnectFromDevice(bleDevice.id)
        : bleManager.connectToDevice(bleDevice.id));
    } catch (err) {
      logErr('Failed to toggle connection:', err);
    } finally {
      setBleDeviceConnected(await bleDevice.isConnected());
    }
  }

  return (
    <View style={styles.bleDeviceListItem}>
      <View style={styles.bleDeviceNameInfoContainer}>
        <Text style={styles.bleDeviceName}>{ bleDevice.localName ?? bleDevice.name }</Text>
        <InfoButton>
          <BleDevice bleDevice={bleDevice} />
        </InfoButton>
      </View>

      <Button
        title={connectToggleTitle}
        loading={connectToggleLoading}
        onPress={() => toggleBleDeviceConnection()}
      />
    </View>
  );
}

BleDeviceListItem.propTypes = {
  bleDevice: PropTypes.instanceOf(Device).isRequired,
};
BleDeviceList.propTypes = {
  title: PropTypes.string,
};
BleDeviceListHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
