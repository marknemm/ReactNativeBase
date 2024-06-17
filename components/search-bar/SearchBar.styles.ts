import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import type { SearchBarStyleProps } from './SearchBar.interfaces';
import type SearchBar from './SearchBar';

/**
 * Gets the styles for the {@link SearchBar} component.
 *
 * @param props The component {@link SearchBarStyleProps}.
 * @returns The styles for the {@link SearchBar} component.
 */
export function useStyles({ loadingStyle }: SearchBarStyleProps) {
  return useThemedStyles(() => ({
    loading: {
      marginRight: 5,
      ...StyleSheet.flatten(loadingStyle),
    },
  }), [loadingStyle]);
}
