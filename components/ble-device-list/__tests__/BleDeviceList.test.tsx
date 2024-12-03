import BleDeviceList from '@components/ble-device-list/BleDeviceList';
import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, renderHook, screen, userEvent, waitFor } from '@testing-library/react-native';
import { useContext } from 'react';
import { logErr } from '@util/log';

// See @util/__mocks__/ble-manager.ts for the mock implementation data.

describe('<BleDeviceList />', () => {
  describe('device items', () => {
    it('filters and sorts devices', async () => {
      render(
        <BleDeviceList />,
        { wrapper: AppProvider }
      );

      const items = await screen.findAllByText(/Device [A-Z]|[0-9]/);
      expect(items).toHaveLength(4);
      expect(items[0]).toHaveTextContent('Device 2');
      expect(items[1]).toHaveTextContent('Device 3');
      expect(items[2]).toHaveTextContent('Device A');
      expect(items[3]).toHaveTextContent('Device B');
    });

    it('refreshes the device list on refresh button press', async () => {
      const { bleManager } = renderHook(
        () => useContext(BleManagerContext),
        { wrapper: AppProvider }
      ).result.current;

      render(
        <BleDeviceList />,
        { wrapper: AppProvider }
      );

      const refreshButton = await screen.findByRole('button', { name: 'Refresh' });
      await userEvent.press(refreshButton);

      expect(bleManager.destroy).toHaveBeenCalledTimes(1);
    });

    it('displays connect and disconnect buttons', async () => {
      render(
        <BleDeviceList />,
        { wrapper: AppProvider }
      );

      const connectButtons = await screen.findAllByRole('button', { name: 'Connect' });
      const disconnectButtons = await screen.findAllByRole('button', { name: 'Disconnect' });

      expect(connectButtons.length).toBe(3);
      expect(disconnectButtons.length).toBe(1);
    });

    it('connects on device connect button press', async () => {
      const { bleManager } = renderHook(
        () => useContext(BleManagerContext),
        { wrapper: AppProvider }
      ).result.current;

      render(
        <BleDeviceList />,
        { wrapper: AppProvider }
      );

      const connectButtons = await screen.findAllByRole('button', { name: 'Connect' });
      await userEvent.press(connectButtons[0]);

      expect(bleManager.connectToDevice).toHaveBeenCalledWith('device-2');
      await waitFor(() => expect(connectButtons[0]).toHaveTextContent('Disconnect'));
    });

    it('Disconnects on device disconnect button press', async () => {
      const { bleManager } = renderHook(
        () => useContext(BleManagerContext),
        { wrapper: AppProvider }
      ).result.current;

      render(
        <BleDeviceList />,
        { wrapper: AppProvider }
      );

      const disconnectButtons = await screen.findAllByRole('button', { name: 'Disconnect' });
      await userEvent.press(disconnectButtons[0]);

      expect(bleManager.disconnectFromDevice).toHaveBeenCalledWith('device-3');
      await waitFor(() => expect(disconnectButtons[0]).toHaveTextContent('Connect'));
    });

    it('logs error and does not change connect state on connection error', async () => {
      const err = new Error('Test error');
      const { bleManager } = renderHook(
        () => useContext(BleManagerContext),
        { wrapper: AppProvider }
      ).result.current;
      (bleManager.connectToDevice as jest.Mock).mockRejectedValueOnce(err);

      render(
        <BleDeviceList />,
        { wrapper: AppProvider }
      );

      const connectButtons = await screen.findAllByRole('button', { name: 'Connect' });
      await userEvent.press(connectButtons[0]);

      expect(bleManager.connectToDevice).toHaveBeenCalledWith('device-2');
      await waitFor(() => expect(logErr).toHaveBeenCalledWith('Failed to toggle connection:', err));
      expect(connectButtons[0]).toHaveTextContent('Connect');
    });
  });

  describe('snapshots', () => {
    it('renders correctly', async () => {
      render(
        <BleDeviceList />,
        { wrapper: AppProvider }
      );

      await screen.findByText(/Device A/); // Wait for full render (async useEffect).
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
