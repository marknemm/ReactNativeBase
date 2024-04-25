import EmailInput from '@components/email-input/EmailInput';
import Form from '@components/form/Form';
import Modal from '@components/modal/Modal';
import PasswordInput from '@components/password-input/PasswordInput';
import { Button, Text } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The {@link PasswordModal} component.
 *
 * @param {Types.Auth.PasswordModalProps} props The component {@link Types.Auth.PasswordModalProps properties}.
 * @returns {React.JSX.Element} The {@link PasswordModal} component.
 */
export default function PasswordModal(props) {
  const styles = useStyles(props);
  const { email, onClose, prompt = 'Sign in to your current account', submitTitle = 'Sign In' } = props;
  const form = useForm({
    defaultValues: {
      email,
      password: '',
    },
  });

  return (
    <Modal
      {...props}
      style={styles.modal}
    >
      {prompt && (
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>
            { prompt }
          </Text>
        </View>
      )}

      <Form form={form}>
        <EmailInput
          label="Email"
          name="email"
          readOnly
        />

        <PasswordInput
          label="Password"
          name="password"
          required
        />

        <Button
          onPress={form.handleSubmit(
            (formData) => onClose(formData.password)
          )}
          style={styles.submitButton}
          title={submitTitle}
        />
      </Form>
    </Modal>
  );
}

PasswordModal.propTypes = {
  email: PropTypes.string.isRequired,
  isPasswordOnly: PropTypes.bool,
  onClose: PropTypes.func,
  prompt: PropTypes.string,
  submitTitle: PropTypes.string,
};
