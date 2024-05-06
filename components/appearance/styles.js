/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';

/**
 * Gets the styles for the `Appearance` component.
 *
 * @returns The styles for the `Appearance` component.
 */
export function useStyles() {
  return useThemedStyles(() => ({
  }), []);
}
