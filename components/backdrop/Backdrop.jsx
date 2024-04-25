import PropTypes from 'prop-types';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from './styles';

/**
 * The {@link Backdrop} component.
 *
 * @param {Types.Modal.BackdropProps} props The component {@link Types.Modal.BackdropProps properties}.
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
