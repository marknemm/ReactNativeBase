import { RootNavigationContainerRefContext } from '@contexts/root-navigation-container-ref/RootNavigationContainerRefContext';
import { NavigationContainerRefContext, useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

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
    headerBackButtonMenuEnabled: true,
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
    ...customOptions,
  }), [customOptions, theme]);
}
