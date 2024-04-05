import BleDeviceList from '@components/ble-device-list/BleDeviceList';
import { View } from 'react-native';
import { screenStyles } from '@styles/screens';

/**
 * Devices screen.
 *
 * @param {Object} param0 The component properties.
 * @param {import('@typedefs/navigation').Navigation} param0.navigation The navigation object.
 * @returns {React.JSX.Element} The devices screen.
 */
export default function DogsScreen({ navigation }) {
  return (
    <View style={screenStyles.containerFlushSides}>
      <BleDeviceList />
    </View>
  );
}
