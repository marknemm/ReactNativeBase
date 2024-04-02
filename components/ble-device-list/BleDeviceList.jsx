import BleDevice from '@components/ble-device/BleDevice';
import BleState from '@components/ble-state/BleState';
import InfoButton from '@components/info-button/InfoButton';
import RefreshButton from '@components/refresh-button/RefreshButton';
import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import { useBleDevices } from '@hooks/ble-hooks';
import { Dialog } from '@rneui/base';
import { Button, Text } from '@rneui/themed';
import { Device } from '@util/ble-manager';
import { logErr } from '@util/log';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

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
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<BleDeviceListHeader title={title} />}
        ListEmptyComponent={<Text>No devices found</Text>}
        data={availableBleDevices}
        renderItem={({ item }) => <BleDeviceListItem bleDevice={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

function BleDeviceListHeader({ title }) {
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
  const [bleDeviceConnected, setBleDeviceConnected] = useState(null);
  const [infoDialogVisible, setInfoDialogVisible] = useState(false);
  const connectToggleTitle = bleDeviceConnected ? 'Disconnect' : 'Connect';
  const connectToggleDisabled = bleDeviceConnected === null;

  useEffect(() => {
    (async () => {
      setBleDeviceConnected(await bleDevice.isConnected());
    })();
  }, [bleDevice]);

  async function toggleBleDeviceConnection() {
    try {
      setBleDeviceConnected(null); // Trigger button disabled state.
      await (bleDeviceConnected
        ? bleDevice.cancelConnection()
        : bleDevice.connect());
    } catch (error) {
      logErr('Failed to toggle connection:', error);
    } finally {
      setBleDeviceConnected(await bleDevice.isConnected());
    }
  }

  return (
    <View style={styles.bleDeviceListItem}>
      <View style={styles.bleDeviceNameInfoContainer}>
        <Text style={styles.bleDeviceName}>{ bleDevice.localName ?? bleDevice.name }</Text>
        <InfoButton onPress={() => setInfoDialogVisible(true)} />

        <Dialog
          isVisible={infoDialogVisible}
          onBackdropPress={() => setInfoDialogVisible(false)}
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView style={{ backgroundColor: 'white' }}>
            <BleDevice bleDevice={bleDevice} />
          </ScrollView>
          <Dialog.Actions>
            <Button onPress={() => setInfoDialogVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </View>

      <Button
        title={connectToggleTitle}
        disabled={connectToggleDisabled}
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
