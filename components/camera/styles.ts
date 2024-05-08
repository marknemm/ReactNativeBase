/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `Camera` component.
 *
 * @param props The component style props.
 * @returns The styles for the `Camera` component.
 */
export function useStyles({ style }: StyleProps) {
  return useThemedStyles(() => ({
    camera: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      ...StyleSheet.flatten(style),
    },
  }), [style]);
}
