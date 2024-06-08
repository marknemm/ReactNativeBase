import type { ActivityIndicatorProps as NativeActivityIndicatorProps } from 'react-native';

/**
 * The `ActivityIndicator` component props.
 */
export interface ActivityIndicatorProps extends NativeActivityIndicatorProps {

  /**
   * Whether the activity indicator is visible.
   *
   * @default true
   */
  isVisible?: boolean;

}

/**
 * The `ActivityIndicator` component style props.
 */
export type ActivityIndicatorStyleProps = Pick<ActivityIndicatorProps, 'color' | 'size' | 'style'>;
