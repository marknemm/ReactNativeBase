import { ActivityIndicator as NativeActivityIndicator } from 'react-native';
import type { ActivityIndicatorProps } from './ActivityIndicator.interfaces';

/**
 * A component that displays an activity indicator or load spinner.
 *
 * @param props The {@link ActivityIndicatorProps}.
 * @returns The {@link ActivityIndicator} component.
 */
const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  isVisible = true,
  ...activityIndicatorProps
}) =>
  isVisible && <NativeActivityIndicator {...activityIndicatorProps} />;

export default ActivityIndicator;
export type * from './ActivityIndicator.interfaces';
