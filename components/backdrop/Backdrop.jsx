import { BackdropContext } from '@contexts/backdrop/BackdropContext';
import { useCallbacks } from '@hooks/callbacks';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from './styles';

/**
 * The {@link Backdrop} component.
 *
 * @param {Types.Backdrop.BackdropProps} props The component {@link Types.Backdrop.BackdropProps properties}.
 * @returns {React.JSX.Element} The {@link Backdrop} component.
 */
export default function Backdrop({ isVisible, onPress, style }) {
  const context = useContext(BackdropContext);
  const styles = useStyles({ style: style ?? context.style });
  const combinedOnPress = useCallbacks(onPress, ...context.pressListeners);

  return (isVisible ?? context.isVisible)
    ? (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        onTouchEnd={combinedOnPress}
        style={styles.backdrop}
      />
    )
    : null;
}

Backdrop.propTypes = {
  isVisible: PropTypes.bool,
  onPress: PropTypes.func,
};
