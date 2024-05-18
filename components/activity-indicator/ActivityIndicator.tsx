import { ActivityIndicator as NativeActivityIndicator } from 'react-native';
import { Props } from './props';

/**
 * A component that displays an activity indicator or load spinner.
 *
 * @param props The component {@link Props}.
 * @returns The {@link ActivityIndicator} component.
 */
const ActivityIndicator: React.FC<Props> = ({ isVisible = true, ...activityIndicatorProps }) =>
  isVisible && <NativeActivityIndicator {...activityIndicatorProps} />;

export default ActivityIndicator;
