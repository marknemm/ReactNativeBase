import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type Avatar from './Avatar';
import type { AvatarStyleProps } from './Avatar.interfaces';

/**
 * Gets the styles for the {@link Avatar} component.
 *
 * @param props The component style props.
 * @returns The styles for the {@link Avatar} component.
 */
export default function useStyles({ backgroundColor, containerStyle }: AvatarStyleProps) {
  return useThemedStyles(() => ({
    container: {
      backgroundColor,
      ...StyleSheet.flatten(containerStyle),
    },
  }), [backgroundColor, containerStyle]);
}
