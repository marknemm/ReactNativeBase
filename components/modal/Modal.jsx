import Backdrop from '@components/backdrop/Backdrop';
import { Dialog } from '@rneui/themed';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from './styles';

/**
 * The {@link Modal} component.
 *
 * Unlike the standard {@link Dialog} component, the {@link Modal} component is blocking and is meant
 * to be launched imperatively from anywhere within the app via {@link import('@util/modal').showModal showModal}.
 *
 * @param {Types.Modal.ModalProps} props The component {@link Types.Modal.ModalProps properties}.
 * @returns {React.JSX.Element} The {@link Modal} component.
 */
export default function Modal({
  backdropStyle,
  children,
  entering = FadeIn,
  exiting = FadeOut,
  isVisible = true,
  onBackdropPress,
  style,
}) {
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
}

Modal.propTypes = {
  backdropStyle: PropTypes.object,
  children: PropTypes.node,
  entering: PropTypes.object,
  exiting: PropTypes.object,
  isVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
};
