import { ColorProps, FontSizeProps, FontWeight, FontWeightProps, Spacing, ThemeWithColors } from '@interfaces/theme';

/**
 * Derives a color value from given color {@link ColorProps props}.
 *
 * @param props The {@link ColorProps}.
 * @param theme The {@link ThemeWithColors}.
 * @returns The derived color value.
 */
export function deriveColor({ muted, color }: ColorProps, theme: ThemeWithColors): string {
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
 * Derives font size from given font {@link FontSizeProps props}.
 *
 * @param props The {@link FontSizeProps}.
 * @param theme The {@link ThemeWithColors}.
 * @returns The derived font size.
 */
export function deriveFontSize(
  { fontSize, fontLarge, fontLarger, fontSmall }: FontSizeProps,
  theme: ThemeWithColors
): number {
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
* Generates the {@link Types.Theme.FontWeight fontWeight} style value from given {@link FontWeightProps props}.
*
* @param props The {@link FontWeightProps}.
* @param theme The {@link Types.Theme.ThemeWithColors}.
* @returns The generated {@link Types.Theme.FontWeight FontWeight} style value.
*/
export function deriveFontWeight(
  { fontWeight, b, bolder, boldest, light, lighter, lightest }: FontWeightProps,
  theme: ThemeWithColors
): FontWeight {
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
 * @param value The symbolic {@link Spacing spacing value}.
 * @param theme The {@link ThemeWithColors}.
 * @param trueValue The spacing value to set when {@link value} is `true`. Defaults to `theme.spacing.md`.
 * @returns The derived spacing value.
 */
export function deriveSpacingValue(value: Spacing, theme: ThemeWithColors, trueValue = theme.spacing.md): number {
  if (typeof value === 'boolean') {
    return value ? trueValue : 0;
  }

  if (typeof value === 'string') {
    return theme.spacing[value];
  }

  return value;
}
