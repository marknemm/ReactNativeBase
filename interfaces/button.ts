import { ButtonProps } from '@rneui/themed';

/**
 * The `FixedIconButton` component properties.
 *
 * @extends ButtonProps The {@link ButtonProps} from the `@rneui/themed` package.
 */
export interface FixedIconButtonProps extends Omit<ButtonProps, 'icon'> {

  /**
   * The color of the icon.
   */
  iconColor?: string;

  /**
   * The size of the icon. Defaults to `24`.
   */
  iconSize?: number;

}

/**
 * The `Button` component style props.
 */
export type ButtonStyleProps = Pick<
  ButtonProps,
  'buttonStyle' | 'color' | 'containerStyle' | 'disabledStyle' | 'disabledTitleStyle' |
  'iconContainerStyle' | 'loadingStyle' | 'size' | 'style' | 'titleStyle'
>;
