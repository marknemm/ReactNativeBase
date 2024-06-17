import { useThemedStyles } from '@hooks/styles-hooks';
import type { ButtonStyleProps } from '@interfaces/button';
import { StyleSheet } from 'react-native';
import type HeaderActionButton from './HeaderActionButton';

/**
 * Gets the styles for the {@link HeaderActionButton} component.
 *
 * @param props The component style props.
 * @returns The styles for the {@link HeaderActionButton} component.
 */
export function useStyles({ titleStyle }: ButtonStyleProps) {
  return useThemedStyles(() => ({
    title: {
      color: 'white',
      ...StyleSheet.flatten(titleStyle),
    },
  }), [titleStyle]);
}
