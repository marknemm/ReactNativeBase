import BleDevice from '@components/ble-device/BleDevice';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, screen } from '@testing-library/react-native';
import { genBleDeviceMock } from '@util/__mocks__/ble-manager';
import { Device } from 'react-native-ble-plx';

describe('<BleDevice />', () => {
  let device: Device;

  beforeEach(() => {
    device = genBleDeviceMock({
      id: 'test-id',
      name: 'test-name',
      localName: 'test-local-name',
      rssi: 50,
    });
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      render(
        <BleDevice bleDevice={device} />,
        { wrapper: AppProvider }
      );

      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
