import Modal from '@components/modal/Modal';
import { Text } from '@rneui/themed';
import SignInScreen from '@screens/sign-in/SignInScreen';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The {@link SignInModal} component.
 *
 * @param {Types.Auth.SignInModalProps} props The component {@link Types.Auth.SignInModalProps properties}.
 * @returns {React.JSX.Element} The {@link SignInModal} component.
 */
export default function SignInModal(props) {
  const styles = useStyles(props);
  const { onClose, prompt } = props;

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

      <SignInScreen
        isModal
        onSignIn={onClose}
      />
    </Modal>
  );
}

SignInModal.propTypes = {
  isPasswordOnly: PropTypes.bool,
  onClose: PropTypes.func,
  prompt: PropTypes.string,
};
