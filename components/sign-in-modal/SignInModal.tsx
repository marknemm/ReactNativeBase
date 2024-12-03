import Modal from '@components/modal/Modal';
import { useValueAnimation } from '@hooks/animation-hooks';
import { Text } from '@rneui/themed';
import ForgotPasswordScreen from '@screens/forgot-password/ForgotPasswordScreen';
import SignInScreen from '@screens/sign-in/SignInScreen';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import type { SignInModalProps } from './SignInModal.interfaces';
import { useStyles } from './SignInModal.styles';

/**
 * A modal dialog for signing in or resetting a password.
 *
 * @param props The component {@link SignInModalProps}.
 * @returns The {@link SignInModal} component.
 */
const SignInModal: React.FC<SignInModalProps> = ({
  isPasswordOnly,
  onClose,
  prompt,
  promptStyle,
  readOnlyEmail,
  style,
  ...modalProps
}) => {
  const styles = useStyles({ promptStyle, style });

  const [showSignIn, setShowSignIn] = useState(true);
  const height = useValueAnimation(showSignIn, 500, 300);

  return (
    <Modal
      style={styles.modal}
      {...modalProps}
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
};

export type * from './SignInModal.interfaces';
export default SignInModal;
