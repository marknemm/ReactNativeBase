/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/theme-hooks';

/**
 * Gets the styles for the `AboutScreen` component.
 *
 * @returns The styles for the `AboutScreen` component.
 */
export function useStyles() {
  return useThemedStyles((theme) => ({
    screenView: {
      paddingHorizontal: theme.spacing.sm,
    },
  }), []);
}
