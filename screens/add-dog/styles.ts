import { useThemedStyles } from '@hooks/styles-hooks';

/**
 * Gets the styles for the `AddDog` component.
 *
 * @returns The styles for the `AddDog` component.
 */
export function useStyles() {
  return useThemedStyles((theme) => ({
    weightUnitsDropdownContainer: {
      flex: 1,
      paddingStart: theme.spacing.md,
    },
  }), []);
}
