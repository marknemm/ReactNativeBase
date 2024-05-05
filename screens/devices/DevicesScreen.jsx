import BleDeviceList from '@components/ble-device-list/BleDeviceList';
import ScreenView from '@components/screen-view/ScreenView';

/**
 * Devices screen.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The devices screen.
 */
export default function DogsScreen({ navigation }) {
  return (
    <ScreenView safeArea>
      <BleDeviceList />
    </ScreenView>
  );
}
