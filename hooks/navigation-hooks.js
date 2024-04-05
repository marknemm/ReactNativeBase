import { useTheme } from '@rneui/themed';
import { useMemo } from 'react';

/** @typedef {import('@react-navigation/native-stack').NativeStackNavigationOptions} NativeStackNavigationOptions */

/**
 * Gets the screen options.
 *
 * @param {NativeStackNavigationOptions} [customOptions] The custom screen options.
 * @returns {NativeStackNavigationOptions} The screen options.
 */
export function useScreenOptions(customOptions = {}) {
  const { theme } = useTheme();

  return useMemo(() => ({
    headerBackButtonMenuEnabled: true,
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
    ...customOptions,
  }), [customOptions, theme]);
}
