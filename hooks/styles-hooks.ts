import { GeneralStylesContext } from '@contexts/general-styles/GeneralStylesContext';
import { GeneralStyles, UseThemedStylesCb } from '@interfaces/styles';
import { ThemeWithColors } from '@interfaces/theme';
import { useTheme } from '@rneui/themed';
import { useContext, useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

/**
 * Custom hook to get the {@link GeneralStyles} associated with the theme.
 *
 * @returns The {@link GeneralStyles}.
 * @see {@link import('@styles/general-styles').createGeneralStyles style implementation}.
 */
export function useGeneralStyles(): GeneralStyles {
  return useContext(GeneralStylesContext);
}

/**
 * Custom hook to create a memoized {@link StyleSheet.NamedStyles StyleSheet} using the {@link ThemeWithColors Theme}.
 *
 * @template T The type of the styles object.
 * @param stylesCb A {@link UseThemedStylesCb} that returns the styles to create the {@link StyleSheet} from.
 * @param deps Will only recreate the {@link StyleSheet.NamedStyles StyleSheet} when the dependencies have changed.
 * @returns The created and memoized {@link StyleSheet.NamedStyles StyleSheet}.
 */
export function useThemedStyles<T extends StyleSheet.NamedStyles<any>>(
  stylesCb: UseThemedStylesCb<T>,
  deps: any[] = []
): T {
  const { theme } = useTheme();
  const windowDimensions = useWindowDimensions();

  deps = deps ?? [];
  deps.push(theme, windowDimensions);

  return useMemo(() =>
    StyleSheet.create(stylesCb(theme, windowDimensions)),
  deps); // eslint-disable-line react-hooks/exhaustive-deps
}
