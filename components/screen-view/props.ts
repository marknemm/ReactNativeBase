import { UseFormReturn } from 'react-hook-form';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

/**
 * The `ScreenView` component properties.
 */
export interface Props extends ViewProps {

  /**
   * The {@link ViewStyle} to apply to the container View.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The form that shall be provided to the view children.
   */
  form?: UseFormReturn<any>;

  /**
   * Whether to apply full screen (no header / bottom tabs) styling.
   */
  fullScreen?: boolean;

  /**
   * Whether to apply no footer styling.
   */
  noFooter?: boolean;

  /**
   * Whether to apply no header styling.
   */
  noHeader?: boolean;

  /**
   * Whether to not apply scrolling to the view.
   */
  noScroll?: boolean;

}

/**
 * The `ScreenView` component style properties.
 */
export type StyleProps = Pick<Props, 'containerStyle' | 'fullScreen' | 'noFooter' | 'noHeader' | 'style'>;
