/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';

/**
 * Gets the styles for the `BleState` component.
 *
 * @returns The styles for the `BleState` component.
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
