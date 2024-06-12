import { useThemedStyles } from '@hooks/styles-hooks';
import type BleDevice from './BleDevice';

/**
 * Gets the styles for the {@link BleDevice} component.
 *
 * @returns The styles for the {@link BleDevice} component.
 */
export function useStyles() {
  return useThemedStyles((theme, windowDimensions) => ({
    moreInfoContent: {
      maxHeight: windowDimensions.height * 0.5,
    },
  }), []);
}
