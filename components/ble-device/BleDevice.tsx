import ExpansionPanel from '@components/expansion-panel/ExpansionPanel';
import { BleDeviceContext } from '@contexts/ble-device/BleDeviceContext';
import { Text } from '@rneui/themed';
import { excludePrivateFields } from '@util/json';
import { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * A component for displaying info for a Bluetooth {@link Device}.
 *
 * @param props The component {@link Props}.
 * @returns The {@link BleDevice} component.
 */
const BleDevice: React.FC<Props> = ({ bleDevice }) => {
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
