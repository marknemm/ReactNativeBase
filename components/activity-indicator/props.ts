import { ActivityIndicatorProps } from 'react-native';

/**
 * The `ActivityIndicator` component props.
 */
export interface Props extends ActivityIndicatorProps {

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
export type StyleProps = Pick<Props, 'color' | 'size' | 'style'>;
