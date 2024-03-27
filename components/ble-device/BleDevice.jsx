import { BleDeviceContext } from '@contexts/ble-device/BleDeviceContext';
import { excludePrivateFields } from '@util/json';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

/**
 * The Bluetooth device component.
 *
 * @returns {React.JSX.Element} The Bluetooth device component.
 */
export default function BleDevice() {
  const bleDevice = useContext(BleDeviceContext);
  const bleDeviceJSON = JSON.stringify(bleDevice, excludePrivateFields, 3);

  return (
    <View style={styles.container}>
      <Text>Bluetooth Device: {bleDeviceJSON}</Text>
    </View>
  );
}
