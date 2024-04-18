import { useNavigation } from '@react-navigation/native';
import { Button, useTheme } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo } from 'react';

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

/**
 * Sets the navigation header buttons based on a given `predicate`.
 *
 * @param {string} [headerBackTitle='Back'] The navigation header back (left) button title. Defaults to `Back`.
 * @param {string} [headerRightTitle] The navigation header right button title. If not given, then no right button is set.
 * @param {boolean | (() => boolean)} [predicate=true] The predicate. Defaults to `true`.
 * @param {() => React.JSX.Element} [headerRight] The header right element. This function will be memoized.
 */
export function useNavHeaderButtons(headerBackTitle, headerRightTitle, predicate, headerRight) {
  const navigation = useNavigation();

  const headerRightCb = useCallback(headerRight ?? (() => {}), []);

  if (typeof predicate === 'function') {
    predicate = predicate();
  }

  useEffect(() => {
    if (predicate || predicate == null) {
      navigation.setOptions({
        headerBackTitle: headerBackTitle || 'Back',
        headerRightTitle: headerRightTitle || undefined,
        headerRight: headerRightCb,
      });
    }
  }, [navigation, headerBackTitle, headerRightTitle, predicate, headerRightCb]);
}
