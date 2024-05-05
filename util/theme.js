/**
 * Derives a color value from a given symbolic theme color.
 *
 * @param {Types.Theme.ColorProps} props The {@link Types.Theme.ColorProps color properties}.
 * @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
 * @returns {string} The derived color value.
 */
export function deriveColor({ muted, color }, theme) {
  if (muted || color === 'muted') {
    return theme.colors.grey3;
  }

  switch (color) {
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    default:
      return color;
  }
}

/**
 * Derives font size from given font {@link props}.
 *
 * @param {Types.Theme.FontSizeProps} props The {@link Types.Theme.FontSizeProps font size properties}.
 * @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
 * @returns {number} The derived font size.
 */
export function deriveFontSize({ fontSize, fontLarge, fontLarger, fontSmall }, theme) {
  if (fontSize) {
    return fontSize;
  }

  if (fontLarge) {
    return theme.font.size.larger;
  }

  if (fontLarger) {
    return theme.font.size.large;
  }

  if (fontSmall) {
    return theme.font.size.small;
  }

  return theme.font.size.normal;
}

/**
* Generates the {@link Types.Theme.FontWeight fontWeight} style value.
*
* @param {Types.Theme.FontWeightProps} props The {@link Types.Theme.FontWeightProps font weight properties}.
* @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
* @returns {Types.Styles.FontWeight} The generated {@link Types.Theme.FontWeight fontWeight} style value.
*/
export function deriveFontWeight({ fontWeight, b, bolder, boldest, light, lighter, lightest }, theme) {
  if (fontWeight) {
    return fontWeight;
  }

  if (boldest) {
    return theme.font.weight.boldest;
  }

  if (bolder) {
    return theme.font.weight.bolder;
  }

  if (b) {
    return theme.font.weight.bold;
  }

  if (lightest) {
    return theme.font.weight.lightest;
  }

  if (lighter) {
    return theme.font.weight.lighter;
  }

  if (light) {
    return theme.font.weight.light;
  }

  return 'normal';
}

/**
 * Derives a spacing value from the given symbolic spacing {@link value}.
 *
 * @param {Types.Theme.Spacing} value The symbolic spacing value.
 * @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
 * @param {number} [trueValue=theme.spacing.md] The spacing value to set when {@link value} is `true`.
 * Defaults to `theme.spacing.md`.
 * @returns {number} The derived spacing value.
 */
export function deriveSpacingValue(value, theme, trueValue = theme.spacing.md) {
  if (typeof value === 'boolean') {
    return value ? trueValue : 0;
  }

  if (typeof value === 'string') {
    return theme.spacing[value];
  }

  return value;
}
