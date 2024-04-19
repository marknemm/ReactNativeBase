import { RootNavigationContainerRefContext } from '@contexts/root-navigation-container-ref/RootNavigationContainerRefContext';
import { NavigationContainerRefContext, useNavigation, usePreventRemoveContext, useRoute } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { nanoid } from 'nanoid/non-secure';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import useLatestCallback from 'use-latest-callback';

/**
 * Gets the {@link Types.Navigation.NavigationContainerRef NavigationContainerRef}.
 *
 * @returns {Types.Navigation.NavigationContainerRef} The {@link Types.Navigation.NavigationContainerRef NavigationContainerRef}.
 */
export function useNavigationContainerRef() {
  return useContext(NavigationContainerRefContext);
}

/**
 * Sets the navigation header options.
 *
 * @param {Types.Navigation.NativeStackNavigationOptions} options The navigation {@link Types.Navigation.NativeStackNavigationOptions options} to set when {@link predicate} evaluates to `true`.
 * @param {boolean | (() => boolean)} [predicate=true] Determines whether to set the navigation {@link Types.Navigation.NativeStackNavigationOptions options}. Defaults to `true`.
 * If changed from `true` to `false`, the original options are restored.
 */
export function useNavigationOptions(options, predicate = true) {
  const navigation = useNavigation();
  const navigationContainerRef = useNavigationContainerRef();
  const originalOptionsRef = useRef(navigationContainerRef?.getCurrentOptions() ?? {});
  const [optionsChanged, setOptionsChanged] = useState(false);

  useEffect(() => {
    const predicateValue = (typeof predicate === 'function')
      ? predicate()
      : predicate;

    if (predicateValue && !optionsChanged) {
      originalOptionsRef.current = navigationContainerRef.getCurrentOptions();
      navigation.setOptions(options);
      setOptionsChanged(true);
    } else if (!predicateValue && optionsChanged) {
      // Remove options that originally were not there; needs to be explicit since given options are merged in with current set.
      for (const key in options) {
        if (originalOptionsRef.current[key] === undefined) {
          originalOptionsRef.current[key] = null;
        }
      }
      navigation.setOptions(originalOptionsRef.current);
      setOptionsChanged(false);
    }
  }, [optionsChanged, navigation, navigationContainerRef, options, originalOptionsRef, predicate]);
}

/**
 * Confirms the navigation (away) action.
 *
 * @param {boolean | (() => boolean)} [predicate=true] Determines whether to confirm the navigation action. Defaults to `true`.
 */
export function useNavigationConfirm(predicate = true) {
  const navigation = useNavigation();

  if (typeof predicate === 'function') {
    predicate = predicate();
  }

  usePreventRemove(predicate, (event) => {
    // Prompt the user before leaving the screen
    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        {
          text: 'Don\'t leave',
          style: 'cancel',
        },
        {
          text: 'Discard',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          onPress: () => navigation.dispatch(event.data.action),
        },
      ]
    );
  });
}

/**
 * Hook to prevent screen from being removed. Can be used to prevent users from leaving the screen.
 *
 * @param {boolean} preventRemove Boolean indicating whether to prevent screen from being removed.
 * @param {(options: { data: { action: import('@react-navigation/routers').NavigationAction } }) => void} callback Function which is executed when screen was prevented from being removed.
 * @see https://github.com/react-navigation/react-navigation/blob/d0abdee67f5db8cf39112af535846ffededfb21d/packages/core/src/usePreventRemove.tsx
 * @todo Remove when the {@link usePreventRemove} hook is added to the `@react-navigation/core` package in `v7`.
 */
export function usePreventRemove(preventRemove, callback) {
  const [id] = useState(() => nanoid());

  const navigation = useNavigation();
  const { key: routeKey } = useRoute();

  const { setPreventRemove } = usePreventRemoveContext();

  useEffect(() => {
    setPreventRemove(id, routeKey, preventRemove);
    return () => {
      setPreventRemove(id, routeKey, false);
    };
  }, [setPreventRemove, id, routeKey, preventRemove]);

  const beforeRemoveListener = useLatestCallback((e) => {
    if (!preventRemove) {
      return;
    }

    e.preventDefault();

    callback({ data: e.data });
  });

  useEffect(
    () => navigation?.addListener('beforeRemove', beforeRemoveListener),
    [navigation, beforeRemoveListener]
  );
}

/**
 * Gets the {@link Types.Navigation.RootNavigationContainerRef RootNavigationContainerRef}.
 *
 * @returns {Types.Navigation.RootNavigationContainerRef} The {@link Types.Navigation.RootNavigationContainerRef RootNavigationContainerRef}.
 */
export function useRootNavigationContainerRef() {
  return useContext(RootNavigationContainerRefContext);
}

/**
 * Gets the screen options.
 *
 * @param {Types.Navigation.NativeStackNavigationOptions} [customOptions] The custom screen {@link Types.Navigation.NativeStackNavigationOptions options}.
 * @returns {Types.Navigation.NativeStackNavigationOptions} The screen {@link Types.Navigation.NativeStackNavigationOptions options}.
 */
export function useScreenOptions(customOptions = {}) {
  const { theme } = useTheme();

  return useMemo(() => ({
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
    ...customOptions,
  }), [customOptions, theme]);
}
