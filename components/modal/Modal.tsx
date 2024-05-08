import Backdrop from '@components/backdrop/Backdrop';
import { Dialog } from '@rneui/themed';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Props } from './props';
import { useStyles } from './styles';

/**
 * Component for a blocking modal dialog.
 *
 * Unlike the standard {@link Dialog} component, the {@link Modal} component is blocking and is meant
 * to be launched imperatively from anywhere within the app via {@link import('@util/modal').showModal showModal}.
 *
 * @param props The component {@link Props}.
 * @returns The {@link Modal} component.
 */
const Modal: React.FC<Props> = ({
  backdropStyle,
  children,
  entering = FadeIn,
  exiting = FadeOut,
  isVisible = true,
  onBackdropPress,
  style,
}) => {
  const styles = useStyles({ style });

  return isVisible && (
    <>
      <Backdrop
        onPress={onBackdropPress}
        style={backdropStyle}
      />

      <Animated.View
        entering={entering}
        exiting={exiting}
        pointerEvents="box-none"
        style={styles.modalContainer}
      >
        <View style={styles.modal}>
          {children}
        </View>
      </Animated.View>
    </>
  );
};

export default Modal;
