/* eslint-disable jsdoc/require-returns-type */
import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type { BackdropStyleProps } from './Backdrop.interfaces';
import type Backdrop from './Backdrop';

/**
 * Gets the styles for the {@link Backdrop} component.
 *
 * @param props The component props.
 * @returns The styles for the {@link Backdrop} component.
 */
export function useStyles({ style }: BackdropStyleProps) {
  return useThemedStyles((theme) => ({
    backdrop: {
      backgroundColor: `${theme.colors.grey0}33`,
      ...StyleSheet.absoluteFillObject,
      ...StyleSheet.flatten(style),
    },
  }), [style]);
}
