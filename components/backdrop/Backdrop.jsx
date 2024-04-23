import PropTypes from 'prop-types';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from './styles';

/**
 * The {@link Backdrop} component.
 *
 * @param {object} props The component properties.
 * @param {boolean} [props.isVisible=true] The visibility state of the backdrop. Defaults to `true`.
 * @param {() => void} [props.onPress] The function to call when the backdrop is pressed.
 * @param {object} [props.style] The style to apply to the backdrop.
 * @returns {React.JSX.Element} The {@link Backdrop} component.
 */
export default function Backdrop({ isVisible = true, onPress, style }) {
  const styles = useStyles({ style });

  return isVisible && (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      onTouchEnd={onPress}
      style={styles.backdrop}
    />
  );
}

Backdrop.propTypes = {
  isVisible: PropTypes.bool,
  onPress: PropTypes.func,
};
