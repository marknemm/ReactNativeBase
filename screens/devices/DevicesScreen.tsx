import BleDeviceList from '@components/ble-device-list/BleDeviceList';
import ScreenView from '@components/screen-view/ScreenView';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { ScreenProps } from '@interfaces/screen';

/**
 * Screen that displays a list of BLE devices.
 */
const DevicesScreen: React.FC<ScreenProps> = () => {
  const generalStyles = useGeneralStyles();

  return (
    <ScreenView noScroll style={generalStyles.view.noPaddingHorizontal}>
      <BleDeviceList />
    </ScreenView>
  );
}

export default DevicesScreen;
