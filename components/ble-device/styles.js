/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';

/**
 * Gets the styles for the `BleDevice` component.
 *
 * @returns The styles for the `BleDevice` component.
 */
export function useStyles() {
  return useThemedStyles((theme, windowDimensions) => ({
    moreInfoContent: {
      maxHeight: windowDimensions.height * 0.5,
    },
  }), []);
}
