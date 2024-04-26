import Modal from '@components/modal/Modal';
import { useValueAnimation } from '@hooks/animation-hooks';
import { Text } from '@rneui/themed';
import ForgotPasswordScreen from '@screens/forgot-password/ForgotPasswordScreen';
import SignInScreen from '@screens/sign-in/SignInScreen';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from './styles';

/**
 * The {@link SignInModal} component.
 *
 * @param {Types.Auth.SignInModalProps} props The component {@link Types.Auth.SignInModalProps properties}.
 * @returns {React.JSX.Element} The {@link SignInModal} component.
 */
export default function SignInModal(props) {
  const styles = useStyles(props);
  const { isPasswordOnly, onClose, prompt, readOnlyEmail } = props;

  const [showSignIn, setShowSignIn] = useState(true);
  const height = useValueAnimation(showSignIn, 500, 300);

  return (
    <Modal
      {...props}
      style={styles.modal}
    >
      {prompt && (
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>
            {prompt}
          </Text>
        </View>
      )}

      <Animated.View style={{ height }}>
        {showSignIn
          ? (
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(150)}
              key="sign-in"
            >
              <SignInScreen
                isModal
                isPasswordOnly={isPasswordOnly}
                onForgotPassword={() => setShowSignIn(false)}
                onSignIn={onClose}
                readOnlyEmail={readOnlyEmail}
              />
            </Animated.View>
          )
          : (
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(150)}
              key="forgot-password"
            >
              <ForgotPasswordScreen
                isModal
                onSignIn={() => setShowSignIn(true)}
                readOnlyEmail={readOnlyEmail}
              />
            </Animated.View>
          )}
      </Animated.View>
    </Modal>
  );
}

SignInModal.propTypes = {
  isPasswordOnly: PropTypes.bool,
  onClose: PropTypes.func,
  prompt: PropTypes.string,
  readOnlyEmail: PropTypes.string,
};
