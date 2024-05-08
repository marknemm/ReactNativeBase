/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `Avatar` component.
 *
 * @param props The component style props.
 * @returns The styles for the `Avatar` component.
 */
export function useStyles({ backgroundColor, containerStyle }: StyleProps) {
  return useThemedStyles(() => ({
    container: {
      backgroundColor,
      ...StyleSheet.flatten(containerStyle),
    },
  }), [backgroundColor, containerStyle]);
}
