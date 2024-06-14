import type { PropsWithChildren } from 'react';
import type { ScaledSize } from 'react-native';
import type { Metrics } from 'react-native-safe-area-context';
import type AppProvider from './AppProvider';

/**
 * The {@link AppProvider} component props.
 */
export type AppProviderProps = PropsWithChildren<{

  /**
   * The color scheme to use.
   */
  colorScheme?: 'light' | 'dark';

  /**
   * The initial safe area {@link Metrics}.
   */
  initialMetrics?: Metrics;

  /**
   * The window {@link ScaledSize} dimensions.
   */
  windowDimensions?: ScaledSize;

}>;
