import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

/**
 * The horizontal padding for screen gutter.
 */
export const horizontalGutter = moderateScale(10);

/**
 * The vertical padding for screen gutter.
 */
export const verticalGutter = moderateScale(20);

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
    fontWeight: '900',
  },
  bottomGutter: {
    marginBottom: verticalGutter,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
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
  fill: {
    width: '100%',
  },
  fillButton: {
    marginHorizontal: horizontalGutter,
    width: 'auto',
  },
  flexItem: {
    flex: 1,
  },
  flexEndItem: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formField: {
    marginBottom: verticalGutter / 3,
  },
  gutter: {
    paddingHorizontal: horizontalGutter,
    paddingVertical: verticalGutter,
  },
  horizontalGutter: {
    paddingHorizontal: horizontalGutter,
  },
  leftGutter: {
    marginLeft: horizontalGutter,
  },
  leftText: {
    textAlign: 'left',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  rightGutter: {
    marginRight: horizontalGutter,
  },
  rightText: {
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
  },
  screenContainer: {
    flexGrow: 1,
  },
  submitButton: {
    marginBottom: verticalGutter / 2,
    marginHorizontal: horizontalGutter,
    width: 'auto',
  },
  submitError: {
    marginTop: verticalGutter / 2,
    textAlign: 'center',
  },
  topGutter: {
    marginTop: verticalGutter,
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
  white: {
    color: 'white',
  },
});
