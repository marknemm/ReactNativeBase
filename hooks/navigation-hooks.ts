import { RootNavigationContainerRefContext } from '@contexts/root-navigation-container-ref/RootNavigationContainerRefContext';
import { RootNavigationContainerRef } from '@interfaces/navigation';
import { NavigationAction, NavigationContainerRef, NavigationContainerRefContext, ParamListBase, useNavigation, usePreventRemoveContext, useRoute } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { Predicate, resolvePredicate } from '@util/predicate';
import { nanoid } from 'nanoid/non-secure';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import useLatestCallback from 'use-latest-callback';

/**
 * Custom hook that gets the {@link NavigationContainerRef}.
 *
 * @returns The {@link NavigationContainerRef}.
 */
export function useNavigationContainerRef(): NavigationContainerRef<ParamListBase> {
  return useContext(NavigationContainerRefContext);
}

/**
 * Custom hook that sets the given navigation {@link options} when the given {@link predicate} is `true`.
 *
 * Also, disables the navigation gestures and hides the back button when the {@link submitting} state is `true`.
 *
 * @param submitting The submitting state.
 * @param options The {@link NativeStackNavigationOptions} to set when {@link predicate} evaluates to `true`.
 * @param predicate A {@link Predicate} that determines whether to set the navigation {@link options}. Defaults to `true`.
 * If changed from `true` to `false`, the original options are restored.
 * Can also be set to an array of dependencies to watch for changes to options if a {@link Predicate} is not needed.
 * @param optionsDependencies The dependencies list to watch for changes to options.
 */
export function useNavigationSubmitOptions(
  submitting: boolean,
  options: NativeStackNavigationOptions,
  predicate: Predicate | ReadonlyArray<any> = true,
  optionsDependencies?: ReadonlyArray<any>
) {
  // Disable navigation on submit
  useNavigationOptions({
    gestureEnabled: false,
    headerBackVisible: false,
  }, submitting, []); // Only set navigation options when the form is submitting

  // Change navigation header options when component loads
  useNavigationOptions(options, predicate, optionsDependencies);
}

/**
 * Custom hook that sets the given navigation {@link options} when the given {@link predicate} is `true`.
 *
 * @param options The {@link NativeStackNavigationOptions} to set when {@link predicate} evaluates to `true`.
 * @param predicate Determines whether to set the navigation {@link options}. Defaults to `true`.
 * If changed from `true` to `false`, the original options are restored.
 * Can also be set to an array of dependencies to watch for changes to options if a {@link Predicate} is not needed.
 * @param optionsDependencies The dependencies to watch for changes to options.
 */
export function useNavigationOptions(
  options: NativeStackNavigationOptions,
  predicate: Predicate | ReadonlyArray<any> = true,
  optionsDependencies?: ReadonlyArray<any>
) {
  const navigation = useNavigation();
  const navigationContainerRef = useNavigationContainerRef();
  const originalOptionsRef: React.MutableRefObject<NativeStackNavigationOptions> = useRef(undefined);

  // Check if second argument is an array of dependencies and predicate is not provided
  if (predicate instanceof Array) {
    optionsDependencies = predicate;
    predicate = true;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  options = useMemo(() => options, optionsDependencies ?? [options]);

  useEffect(() => {
    let key: keyof NativeStackNavigationOptions;
    const predicateValue = resolvePredicate(predicate as Predicate);

    if (predicateValue) {
      originalOptionsRef.current = navigationContainerRef.getCurrentOptions();
      // Only record original options that are being set with the given options so we don't clobber other option changes.
      for (key in originalOptionsRef.current) {
        if (options[key] === undefined) {
          delete originalOptionsRef.current[key];
        }
      }

      navigation.setOptions(options);
    } else if (!predicateValue && originalOptionsRef.current) {
      // Remove options that originally were not there; needs to be explicit since given options are merged in with current set.
      for (key in options) {
        if (originalOptionsRef.current[key] === undefined) {
          (originalOptionsRef as any).current[key] = null;
        }
      }

      navigation.setOptions(originalOptionsRef.current);
      originalOptionsRef.current = undefined;
    }
  }, [navigation, navigationContainerRef, options, originalOptionsRef, predicate]);
}

/**
 * Custom hook that prompts the user to confirm the navigation (away) action.
 * Can be used to prevent users from unintentionally leaving the screen.
 *
 * @param predicate A {@link Predicate} that determines whether to confirm the navigation action. Defaults to `true`.
 */
export function useNavigationConfirm(predicate: Predicate = true) {
  const navigation = useNavigation();

  predicate = resolvePredicate(predicate);

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
 * Custom hook that prevents screen from being removed. Can be used to prevent users from leaving the screen.
 *
 * @param preventRemove Boolean indicating whether to prevent screen from being removed.
 * @param callback Function which is executed when screen was prevented from being removed.
 * @see https://github.com/react-navigation/react-navigation/blob/d0abdee67f5db8cf39112af535846ffededfb21d/packages/core/src/usePreventRemove.tsx
 * @todo Remove when the {@link usePreventRemove} hook is added to the `@react-navigation/core` package in `v7`.
 */
export function usePreventRemove(
  preventRemove: boolean,
  callback: (options: { data: { action: NavigationAction } }) => void
) {
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

  const beforeRemoveListener = useLatestCallback((e: any) => {
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
 * Custom hook that gets the {@link RootNavigationContainerRef}.
 *
 * @returns The {@link RootNavigationContainerRef}.
 */
export function useRootNavigationContainerRef(): RootNavigationContainerRef {
  return useContext(RootNavigationContainerRefContext);
}

/**
 * Custom hook that gets the screen options.
 *
 * @param customOptions The custom screen {@link NativeStackNavigationOptions}.
 * @returns The screen {@link NativeStackNavigationOptions}.
 */
export function useScreenOptions(customOptions: NativeStackNavigationOptions = {}): NativeStackNavigationOptions {
  const { theme } = useTheme();

  return useMemo(() => ({
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
    ...customOptions,
  }), [customOptions, theme]);
}
