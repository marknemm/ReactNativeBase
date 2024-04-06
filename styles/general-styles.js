import { StyleSheet } from 'react-native';

/**
 * The horizontal padding for screen gutter.
 */
export const horizontalGutter = 10;

/**
 * The vertical padding for screen gutter.
 */
export const verticalGutter = 20;

/**
 * General styles.
 */
export const generalStyles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  bolder: {
    fontWeight: '700',
  },
  boldest: {
    fontWeight: '900'
  },
  column: {
    flexDirection: 'column',
  },
  doubleUnderline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  },
  doubleUnderlineBold: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    fontWeight: 'bold',
  },
  doubleUnderlineBolder: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    fontWeight: '700',
  },
  doubleUnderlineBoldest: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    fontWeight: '900',
  },
  errorText: {
    color: 'red',
  },
  flexItem: {
    flex: 1,
  },
  gutter: {
    paddingHorizontal: horizontalGutter,
    paddingVertical: verticalGutter,
  },
  horizontalGutter: {
    paddingHorizontal: horizontalGutter,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  row: {
    flexDirection: 'row',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  underlineBold: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  underlineBolder: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  underlineBoldest: {
    textDecorationLine: 'underline',
    fontWeight: '900',
  },
  verticalGutter: {
    paddingVertical: verticalGutter,
  },
});
