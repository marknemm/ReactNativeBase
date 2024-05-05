import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The {@link StatusDot} component.
 *
 * @param {Object} props The component properties.
 * @param {string} [props.color='gray'] The color of the {@link StatusDot}.
 * @param {number} [props.size=10] The size of the {@link StatusDot}.
 * @param {Object} [props.style={}] The additional style of the {@link StatusDot}.
 * @returns {React.JSX.Element} The {@link StatusDot} component.
 */
export default function StatusDot(props) {
  const styles = useStyles(props);

  return <View style={styles.statusDot} />;
}
