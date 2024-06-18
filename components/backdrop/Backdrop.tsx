import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import type { BackdropProps } from './Backdrop.interfaces';
import { useStyles } from './Backdrop.styles';

/**
 * Component for a modal backdrop.
 *
 * @param props The component {@link BackdropProps}.
 * @returns The {@link Backdrop} component.
 */
const Backdrop: React.FC<BackdropProps> = (props) => {
  const { isVisible = true, onPress } = props;
  const styles = useStyles(props);

  return isVisible && (
    <Animated.View
      accessibilityRole={onPress ? 'button' : undefined}
      entering={FadeIn}
      exiting={FadeOut}
      onTouchEnd={onPress}
      style={styles.backdrop}
      testID="rnb-backdrop"
    />
  );
};

export default Backdrop;
export type * from './Backdrop.interfaces';
