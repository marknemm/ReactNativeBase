import BleDeviceList from '@components/ble-device-list/BleDeviceList';
import { generalStyles } from '@styles/general-styles';
import { View } from 'react-native';

/**
 * Devices screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The devices screen.
 */
export default function DogsScreen({ navigation }) {
  return (
    <View style={generalStyles.verticalGutter}>
      <BleDeviceList />
    </View>
  );
}
