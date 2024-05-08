import { ThemeWithColors } from '@interfaces/theme';
import { DividerProps } from '@rneui/themed';
import { deriveSpacingValue } from '@util/theme';
import { moderateScale } from 'react-native-size-matters';

/**
 * The `Divider` component theme.
 *
 * @param props The `Divider` component {@link DividerProps properties}.
 * @param theme The {@link ThemeWithColors Theme}.
 * @returns The default themed `Divider` component {@link DividerProps properties}.
 */
export default function Divider(props: DividerProps, theme: ThemeWithColors): DividerProps {
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
 * @param props The `Divider` component {@link DividerProps properties}.
 * @param theme The {@link ThemeWithColors Theme}.
 * @param marginOrientation The margin orientation.
 * @param marginSide The margin side.
 * @returns The dual-sided margin for the divider.
 */
function genDividerMargin(
  {
    orientation = 'horizontal',
    spacing = null,
    spacingEnd = null,
    spacingStart = null,
  }: DividerProps,
  theme: ThemeWithColors,
  marginOrientation: 'horizontal' | 'vertical',
  marginSide: 'both' | 'end' | 'start' = 'both'
): number {
  if (marginSide === 'start') {
    spacing = spacingStart;
  } else if (marginSide === 'end') {
    spacing = spacingEnd;
  }

  return (orientation !== marginOrientation)
    ? deriveSpacingValue(spacing, theme) ?? theme.spacing.md
    : undefined;
}
