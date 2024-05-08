import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * Component for a modal backdrop.
 *
 * @param props The component {@link Props}.
 * @returns The {@link Backdrop} component.
 */
const Backdrop: React.FC<Props> = (props) => {
  const { isVisible = true, onPress } = props;
  const styles = useStyles(props);

  return isVisible && (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      onTouchEnd={onPress}
      style={styles.backdrop}
    />
  );
};

export default Backdrop;
