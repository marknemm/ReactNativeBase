import type { UseFormReturn } from 'react-hook-form';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type ScreenView from './ScreenView';

/**
 * The {@link ScreenView} component properties.
 *
 * @extends ViewProps The {@link ViewProps} from the `react-native` module.
 */
export interface ScreenViewProps extends ViewProps {

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
 * The {@link ScreenView} component style properties.
 */
export type ScreenViewStyleProps = Pick<
  ScreenViewProps,
  'containerStyle' | 'fullScreen' | 'noFooter' | 'noHeader' | 'style'
>;
