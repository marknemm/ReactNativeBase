import { GeneralStylesContext } from '@contexts/general-styles/GeneralStylesContext';
import { useTheme } from '@rneui/themed';
import { useContext, useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

/**
 * Custom hook to get the {@link Types.Styles.GeneralStyles general styles} associated with the theme.
 *
 * @returns {Types.Styles.GeneralStyles} The {@link Types.Styles.GeneralStyles general styles}.
 * @see {@link import('@styles/general-styles').createGeneralStyles style implementation}.
 */
export function useGeneralStyles() {
  return useContext(GeneralStylesContext);
}

/**
 * Custom hook to create a memoized {@link StyleSheet.NamedStyles StyleSheet} using the {@link Types.Rneui.Theme Theme}.
 *
 * @template {StyleSheet.NamedStyles<any>} T The type of the styles object.
 * @param {(theme: Types.Rneui.Theme & { colors: Types.Rneui.Colors }, windowDimensions: Types.ScaledSize) => T} stylesCb
 * The styles to create the {@link StyleSheet} from.
 * @param {Array} deps Will only recreate the {@link StyleSheet.NamedStyles StyleSheet} when the dependencies have changed.
 * @returns {T} The created {@link StyleSheet.NamedStyles StyleSheet}.
 */
export function useThemedStyles(stylesCb, deps) {
  const { theme } = useTheme();
  const windowDimensions = useWindowDimensions();

  deps = deps ?? [];
  deps.push(theme, windowDimensions);

  return useMemo(() =>
    StyleSheet.create(stylesCb(theme, windowDimensions)),
  deps); // eslint-disable-line react-hooks/exhaustive-deps
}
