import Backdrop from '@components/backdrop/Backdrop';
import { Dialog } from '@rneui/themed';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import type { ModalProps } from './Modal.interfaces';
import { useStyles } from './Modal.styles';

/**
 * Component for a blocking modal dialog.
 *
 * Unlike the standard {@link Dialog} component, the {@link Modal} component is blocking and is meant
 * to be launched imperatively from anywhere within the app via {@link import('@util/modal').showModal showModal}.
 *
 * @param props The component {@link ModalProps}.
 * @returns The {@link Modal} component.
 */
const Modal: React.FC<ModalProps> = ({
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
        accessibilityViewIsModal
        entering={entering}
        exiting={exiting}
        pointerEvents="box-none"
        style={styles.modalContainer}
        testID="rnb-modal-container"
      >
        <View
          style={styles.modal}
          testID="rnb-modal"
        >
          {children}
        </View>
      </Animated.View>
    </>
  );
};

export type * from './Modal.interfaces';
export default Modal;
