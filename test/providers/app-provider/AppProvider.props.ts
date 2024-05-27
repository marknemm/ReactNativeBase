import { UserDoc } from '@interfaces/user';
import { ReactNode } from 'react';
import { ScaledSize } from 'react-native';
import { Metrics } from 'react-native-safe-area-context';

/**
 * The {@link AppProvider} component props.
 */
export default interface AppProviderProps {

  /**
   * The children components.
   */
  children?: ReactNode;

  /**
   * The color scheme to use.
   */
  colorScheme?: 'light' | 'dark';

  /**
   * The initial safe area metrics.
   */
  initialMetrics?: Metrics;

  /**
   * The user document data.
   */
  userDoc?: UserDoc;

  /**
   * The window dimensions.
   */
  windowDimensions?: ScaledSize;

}
