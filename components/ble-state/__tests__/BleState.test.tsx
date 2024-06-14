import BleState from '@components/ble-state/BleState';
import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import AppProvider from '@test/contexts/app/AppProvider';
import { render, renderHook } from '@testing-library/react-native';
import { State } from '@util/ble-manager';
import { useContext } from 'react';

describe('<BleState />', () => {
  describe('snapshots', () => {
    it('renders correctly when powered on', () => {
      const tree = render(
        <BleState />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when powered off', () => {
      const { bleManager } = renderHook(
        () => useContext(BleManagerContext),
        { wrapper: AppProvider }
      ).result.current;
      (bleManager.onStateChange as jest.Mock).mockImplementationOnce((cb) => cb(State.PoweredOff));

      const tree = render(
        <BleState />,
        { wrapper: AppProvider }
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
