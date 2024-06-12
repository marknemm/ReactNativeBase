import ExpansionPanel from '@components/expansion-panel/ExpansionPanel';
import { BleDeviceContext } from '@contexts/ble-device/BleDeviceContext';
import { Text } from '@rneui/themed';
import { excludePrivateFields } from '@util/json';
import { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import type { BleDeviceProps } from './BleDevice.interfaces';
import { useStyles } from './BleDevice.styles';

/**
 * A component for displaying info for a Bluetooth {@link Device}.
 *
 * @param props The component {@link BleDeviceProps}.
 * @returns The {@link BleDevice} component.
 */
const BleDevice: React.FC<BleDeviceProps> = ({ bleDevice }) => {
  const styles = useStyles();
  const bleDeviceCtx = useContext(BleDeviceContext);
  bleDevice = bleDevice ?? bleDeviceCtx.bleDevice;
  const bleDeviceJSON = JSON.stringify(bleDevice, excludePrivateFields, 3);

  return (
    <View>
      <Text>ID: {bleDevice.id}</Text>
      <Text>Name: {bleDevice.name ?? ''}</Text>
      <Text>Local Name: {bleDevice.localName ?? ''}</Text>

      <ExpansionPanel title="More Info">
        <ScrollView style={styles.moreInfoContent}>
          <Text>Bluetooth Device: {bleDeviceJSON}</Text>
        </ScrollView>
      </ExpansionPanel>
    </View>
  );
};

export default BleDevice;
export type * from './BleDevice.interfaces';
