import { BleManagerContext } from '@contexts/ble-manager/BleManagerContext';
import BleManagerProvider from '@contexts/ble-manager/BleManagerProvider';
import { act, renderHook } from '@testing-library/react-native';
import { useContext } from 'react';

jest.mock('@util/ble-manager');

describe('<BleManagerProvider />', () => {
  describe('Create', () => {
    it('Creates a new BleManager', () => {
      const bleManagerCtx = renderHook(
        () => useContext(BleManagerContext),
        { wrapper: BleManagerProvider }
      ).result.current;

      expect(bleManagerCtx.bleManager).toBeTruthy();
      expect(bleManagerCtx.resetBleManager).toBeInstanceOf(Function);
    });
  });

  describe('Destroy', () => {
    it('Destroys the BleManager on unmount', () => {
      const { result, unmount } = renderHook(
        () => useContext(BleManagerContext),
        { wrapper: BleManagerProvider }
      );
      const { bleManager } = result.current;

      unmount();
      expect(bleManager.destroy).toHaveBeenCalled();
    });
  });

  describe('Reset', () => {
    it('Resets the BleManager', () => {
      const { rerender, result } = renderHook(
        () => useContext(BleManagerContext),
        { wrapper: BleManagerProvider }
      );
      const oldBleManagerCtx = result.current;

      act(() => oldBleManagerCtx.resetBleManager());

      expect(oldBleManagerCtx.bleManager.destroy).toHaveBeenCalled();

      rerender({});
      const newBleManagerCtx = result.current;

      expect(newBleManagerCtx.bleManager).not.toBe(oldBleManagerCtx.bleManager);
    });
  });
});
