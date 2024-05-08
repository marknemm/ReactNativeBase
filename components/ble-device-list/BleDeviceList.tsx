import BleDevice from '@components/ble-device/BleDevice';
import BleState from '@components/ble-state/BleState';
import InfoButton from '@components/info-button/InfoButton';
import RefreshButton from '@components/refresh-button/RefreshButton';
import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import { useBleDevices } from '@hooks/ble-hooks';
import { Button, Text } from '@rneui/themed';
import { Device } from '@util/ble-manager';
import { logErr } from '@util/log';
import { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { BleDeviceListHeaderProps, BleDeviceListItemProps, Props } from './props';
import { useStyles } from './styles';

/**
 * A component for displaying a list of Bluetooth {@link Device Devices}.
 *
 * @param props The component {@link Props}.
 * @returns The {@link BleDeviceList} component.
 */
const BleDeviceList: React.FC<Props> = ({ title = 'Detected Devices' }) => {
  const bleDevices = useBleDevices();
  const availableBleDevices = bleDevices.filter(
    (d) => d.localName || d.name
  ).sort(
    (a, b) => (a.localName ?? a.name).localeCompare(b.localName ?? b.name)
  );

  return (
    <View>
      <FlatList
        data={availableBleDevices}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No devices found</Text>}
        ListHeaderComponent={<BleDeviceListHeader title={title} />}
        renderItem={({ item }) => <BleDeviceListItem bleDevice={item} />}
      />
    </View>
  );
};

/**
 * Component for the header of the {@link BleDeviceList}.
 *
 * @param props The component {@link BleDeviceListHeaderProps}.
 * @returns The {@link BleDeviceListHeader} component.
 */
const BleDeviceListHeader: React.FC<BleDeviceListHeaderProps> = ({ title }) => {
  const styles = useStyles();
  const { resetBleManager } = useContext(BleManagerContext);

  return (
    <View style={styles.deviceListHeader}>
      <Text style={styles.deviceListTitle}>{ title }</Text>
      <BleState />
      <RefreshButton onPress={() => resetBleManager()} />
    </View>
  );
};

/**
 * A component for displaying a Bluetooth {@link Device} in a list.
 *
 * @param props The component {@link BleDeviceListItemProps}.
 * @returns The {@link BleDeviceListItem} component.
 */
const BleDeviceListItem: React.FC<BleDeviceListItemProps> = ({ bleDevice }) => {
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
        <Text style={styles.bleDeviceName}>
          { bleDevice.localName ?? bleDevice.name }
        </Text>
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
};

export default BleDeviceList;
