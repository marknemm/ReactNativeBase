import { TextStyle, ViewStyle } from 'react-native';

/**
 * Font weight style value.
 */
export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

/**
 * {@link GeneralStyles General styles}.
 *
 * see {@link import('@style/general-styles').createGeneralStyles style implementation}.
 */
export interface GeneralStyles {

  /**
   * General {@link ColorStyles color styles}.
   *
   * @see {@link import('@style/color-styles').createColorStyles style implementation}.
   */
  color: ColorStyles;

  /**
   * General {@link FormStyles form styles}.
   *
   * see {@link import('@style/form-styles').createFormStyles style implementation}.
   */
  form: FormStyles;

  /**
   * General {@link ImageStyles image styles}.
   *
   * see {@link import('@style/image-styles').createImageStyles style implementation}.
   */
  image: ImageStyles;

  /**
   * General {@link TextStyles text styles}.
   *
   * see {@link import('@style/text-styles').createTextStyles style implementation}.
   */
  text: TextStyles;

  /**
   * General {@link ViewStyles view styles}.
   *
   * see {@link import('@style/view-styles').createViewStyles style implementation}.
   */
  view: ViewStyles;

}

/**
 * General color styles.
 */
export type ColorStyles = {
  background: ViewStyle;
  black: TextStyle;
  blackBg: ViewStyle;
  gray0: TextStyle;
  gray0Bg: ViewStyle;
  gray1: TextStyle;
  gray1Bg: ViewStyle;
  gray2: TextStyle;
  gray2Bg: ViewStyle;
  gray3: TextStyle;
  gray3Bg: ViewStyle;
  gray4: TextStyle;
  gray4Bg: ViewStyle;
  gray5: TextStyle;
  gray5Bg: ViewStyle;
  grayOutline: ViewStyle;
  error: TextStyle;
  errorBg: ViewStyle;
  muted: TextStyle;
  mutedBg: ViewStyle;
  placeholder: TextStyle;
  primary: TextStyle;
  primaryBg: ViewStyle;
  searchBg: ViewStyle;
  secondary: TextStyle;
  secondaryBg: ViewStyle;
  success: TextStyle;
  successBg: ViewStyle;
  warning: TextStyle;
  warningBg: ViewStyle;
  white: TextStyle;
  whiteBg: ViewStyle;
};

/**
 * General form styles.
 */
export type FormStyles = {
  field: ViewStyle;
  fieldBorder: ViewStyle;
  fieldContainer: ViewStyle;
  fieldText: TextStyle;
  label: TextStyle;
  placeholder: TextStyle;
  submitButton: ViewStyle;
  submitError: TextStyle;
};

/**
 * General image styles.
 */
export type ImageStyles = {

}

/**
 * General text styles.
 */
export type TextStyles = {
  bold: TextStyle;
  bolder: TextStyle;
  boldest: TextStyle;
  center: TextStyle;
  doubleUnderline: TextStyle;
  doubleUnderlineBold: TextStyle;
  doubleUnderlineBolder: TextStyle;
  doubleUnderlineBoldest: TextStyle;
  left: TextStyle;
  lineThrough: TextStyle;
  right: TextStyle;
  underline: TextStyle;
  underlineBold: TextStyle;
  underlineBolder: TextStyle;
  underlineBoldest: TextStyle;
}

/**
 * General view styles.
 */
export type ViewStyles = {
  center: ViewStyle;
  column: ViewStyle;
  flexItem: ViewStyle;
  flexEndItem: ViewStyle;
  fullWidth: ViewStyle;
  row: ViewStyle;
  screenMarginHorizontal: ViewStyle;
}
