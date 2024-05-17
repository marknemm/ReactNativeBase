import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `SearchBar` component.
 *
 * @param props The component {@link StyleProps}.
 * @returns The styles for the `SearchBar` component.
 */
export function useStyles({ loadingStyle }: StyleProps) {
  return useThemedStyles(() => ({
    loading: {
      marginRight: 5,
      ...StyleSheet.flatten(loadingStyle),
    },
  }), [loadingStyle]);
}
