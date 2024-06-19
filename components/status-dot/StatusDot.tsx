import { View } from 'react-native';
import { useStyles } from './StatusDot.styles';
import type { StatusDotProps } from './StatusDot.interfaces';

/**
 * A colored dot to represent a status.
 *
 * @param props The component {@link StatusDotProps}.
 * @returns The {@link StatusDot} component.
 */
const StatusDot: React.FC<StatusDotProps> = ({
  color,
  size,
  style,
  testID = 'rnb-status-dot',
}) => {
  const styles = useStyles({ color, size, style });

  return (
    <View
      style={styles.statusDot}
      testID={testID}
    />
  );
};

export type * from './StatusDot.interfaces';
export default StatusDot;
