import { useThemedStyles } from '@hooks/styles-hooks';
import { ButtonStyleProps } from '@interfaces/button';
import { StyleSheet } from 'react-native';

/**
 * Gets the styles for the `HeaderActionButton` component.
 *
 * @param props The component style props.
 * @returns The styles for the `HeaderActionButton` component.
 */
export function useStyles({ titleStyle }: ButtonStyleProps) {
  return useThemedStyles(() => ({
    title: {
      color: 'white',
      ...StyleSheet.flatten(titleStyle),
    },
  }), [titleStyle]);
}
