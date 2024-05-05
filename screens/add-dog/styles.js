/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';

/**
 * Gets the styles for the `AddDog` component.
 *
 * @returns The styles for the `AddDog` component.
 */
export function useStyles() {
  return useThemedStyles(() => ({
    weightInputContainer: {
      flex: 2,
    },
    weightUnitsDropdownContainer: {
      flex: 1,
      paddingEnd: 10,
    },
  }), []);
}
