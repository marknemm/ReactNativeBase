import { StyleSheet } from 'react-native';

/**
 * The horizontal padding for general screen containers.
 */
export const screenPaddingHorizontal = 10;
/**
 * The vertical padding for general screen containers.
 */
export const screenPaddingVertical = 20;

/**
 * General screen styles.
 */
export const screenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: screenPaddingHorizontal,
    paddingVertical: screenPaddingVertical,
  },
  containerFlushSides: {
    paddingVertical: screenPaddingVertical,
  },
});
