import StatusDot from '@components/status-dot/StatusDot';
import Tooltip from '@components/tooltip/Tooltip';
import { useBleState } from '@hooks/ble-hooks';
import { State } from '@util/ble-manager';
import { Text, View } from 'react-native';
import { styles } from './styles';

/**
 * The Bluetooth state component.
 *
 * @returns {React.JSX.Element} The Bluetooth state component.
 */
export default function BleState() {
  const bleState = useBleState();
  const bleStatusColor = bleState === State.PoweredOn
    ? 'green'
    : 'red';

  return (
    <View style={styles.container}>
      <Tooltip popover={<Text style={styles.tooltipText}>{ bleState }</Text>}>
        <View style={styles.container}>
          <StatusDot color={bleStatusColor} />
          <Text>BLE Status</Text>
        </View>
      </Tooltip>
    </View>
  );
}
