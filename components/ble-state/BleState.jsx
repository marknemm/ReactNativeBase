import { useBleState } from '@hooks/ble-hooks';
import { Text, View } from 'react-native';
import { styles } from './styles';

/**
 * The Bluetooth state component.
 *
 * @returns {React.JSX.Element} The Bluetooth state component.
 */
export default function BleState() {
  const bleState = useBleState();

  return (
    <View style={styles.container}>
      <Text>Bluetooth State: {bleState}</Text>
    </View>
  );
}
