import { deriveSpacingValue } from '@util/theme';
import { moderateScale } from 'react-native-size-matters';

/**
 * The `Divider` component theme.
 *
 * @param {Types.Rneui.DividerProps} props The `Divider` component {@link Types.Rneui.DividerProps properties}.
 * @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
 * @returns {Types.Rneui.DividerProps} The default themed `Divider` component {@link Types.Rneui.DividerProps properties}.
 */
export default function Divider(props, theme) {
  return {
    style: {
      marginVertical: genDividerMargin(props, theme, 'vertical'),
      marginHorizontal: genDividerMargin(props, theme, 'horizontal'),
      marginTop: genDividerMargin(props, theme, 'vertical', 'start'),
      marginBottom: genDividerMargin(props, theme, 'vertical', 'end'),
      marginLeft: genDividerMargin(props, theme, 'horizontal', 'start'),
      marginRight: genDividerMargin(props, theme, 'horizontal', 'end'),
    },
    width: moderateScale(0.33),
  };
}

/**
 * Generates the dual-sided margin for the divider.
 *
 * @param {Types.Rneui.DividerProps} props The `Divider` component {@link Types.Rneui.DividerProps properties}.
 * @param {Types.Rneui.FullTheme} theme The {@link Types.Rneui.FullTheme theme}.
 * @param {'horizontal' | 'vertical'} marginOrientation The margin orientation.
 * @param {'both' | 'end' | 'start'} [marginSide='both'] The margin side.
 * @returns {number} The dual-sided margin for the divider.
 */
function genDividerMargin(
  {
    orientation = 'horizontal',
    spacing,
    spacingEnd,
    spacingStart,
  },
  theme,
  marginOrientation,
  marginSide = 'both'
) {
  if (marginSide === 'start') {
    spacing = spacingStart;
  } else if (marginSide === 'end') {
    spacing = spacingEnd;
  }

  return (orientation !== marginOrientation)
    ? deriveSpacingValue(spacing, theme) ?? theme.spacing.md
    : undefined;
}
