import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { AvatarStyleProps } from './Avatar.interfaces';

/**
 * Gets the styles for the `Avatar` component.
 *
 * @param props The component style props.
 * @returns The styles for the `Avatar` component.
 */
export default function useStyles({ backgroundColor, containerStyle }: AvatarStyleProps) {
  return useThemedStyles(() => ({
    container: {
      backgroundColor,
      ...StyleSheet.flatten(containerStyle),
    },
  }), [backgroundColor, containerStyle]);
}
