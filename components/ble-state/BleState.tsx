import StatusDot from '@components/status-dot/StatusDot';
import Tooltip from '@components/tooltip/Tooltip';
import { useBleState } from '@hooks/ble-hooks';
import { Text } from '@rneui/themed';
import { State } from '@util/ble-manager';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * A component for displaying the BLE {@link State}.
 */
const BleState: React.FC = () => {
  const styles = useStyles();
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

export default BleState;
