/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `Backdrop` component.
 *
 * @param props The component props.
 * @returns The styles for the `Backdrop` component.
 */
export function useStyles({ style }: StyleProps) {
  return useThemedStyles((theme) => ({
    backdrop: {
      backgroundColor: `${theme.colors.grey0}33`,
      ...StyleSheet.absoluteFillObject,
      ...StyleSheet.flatten(style),
    },
  }), [style]);
}
