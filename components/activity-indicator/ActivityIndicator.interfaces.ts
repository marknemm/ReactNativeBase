import type { ActivityIndicatorProps as NativeActivityIndicatorProps } from 'react-native';
import type ActivityIndicator from './ActivityIndicator';

/**
 * The {@link ActivityIndicator} component props.
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
 * The {@link ActivityIndicator} component style props.
 */
export type ActivityIndicatorStyleProps = Pick<ActivityIndicatorProps, 'color' | 'size' | 'style'>;
