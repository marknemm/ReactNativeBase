import { useThemedStyles } from '@hooks/styles-hooks';
import type BleState from './BleState';

/**
 * Gets the styles for the {@link BleState} component.
 *
 * @returns The styles for the {@link BleState} component.
 */
export function useStyles() {
  return useThemedStyles(() => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 5,
      flexGrow: 1,
    },
    tooltipText: {
      color: 'white',
    },
  }), []);
}
