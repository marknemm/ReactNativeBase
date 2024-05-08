import { View } from 'react-native';
import { useStyles } from './styles';
import { Props } from './props';

/**
 * A colored dot to represent a status.
 *
 * @param props The component {@link Props}.
 * @returns The {@link StatusDot} component.
 */
const StatusDot: React.FC<Props> = ({ color, size, style }) => {
  const styles = useStyles({ color, size, style });

  return <View style={styles.statusDot} />;
};

export default StatusDot;
