import EmailInput from '@components/email-input/EmailInput';
import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import { useSubmitState } from '@hooks/form-hooks';
import { useLSState } from '@hooks/local-storage-hooks';
import { Button, Text } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { sendPasswordResetEmail } from '@util/auth';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * {@link ForgotPasswordScreen} component.
 *
 * @param {Object} props The component properties.
 * @param {boolean} [props.isModal] Whether the screen is a modal.
 * @param {Types.Navigation.StackNavigation} [props.navigation] The {@link Types.Navigation.StackNavigation navigation} object.
 * @param {() => void} [props.onSignIn] The function to call when the user presses the sign in button.
 * @param {string} [props.readOnlyEmail] The email address that must be used for the forgot password.
 * @returns {React.JSX.Element} The {@link ForgotPasswordScreen} component.
 */
export default function ForgotPasswordScreen({ isModal, navigation, onSignIn, readOnlyEmail }) {
  const styles = useStyles();
  const [lastSignInEmail] = useLSState(AUTH_SIGN_IN_LAST_EMAIL_KEY, { defaultValue: '' });
  const form = useForm({
    defaultValues: {
      email: readOnlyEmail || lastSignInEmail,
    },
  });
  const { handleSubmit, submitError, submitSuccessful, submitting } = useSubmitState(form);

  return (
    <Form
      form={form}
      safeArea
      scrollable
      style={generalStyles.screenContainer}
    >

      <EmailInput
        containerStyle={styles.formField}
        label="Email"
        name="email"
        readOnly={!!readOnlyEmail}
        textContentType="username"
      />

      <Button
        loading={submitting}
        onPress={handleSubmit(({ email }) => sendPasswordResetEmail(email))}
        style={styles.submitButton}
        title={`${submitSuccessful ? 'Resend' : 'Send'} Password Reset Email`}
      />

      <Button
        disabled={submitting}
        onPress={() => {
          if (!isModal) { // Can't navigate to sign in from a modal
            navigation.navigate('Sign In');
          }
          onSignIn?.();
        }}
        style={generalStyles.horizontalGutter}
        title="Sign in"
        type="clear"
      />

      {submitSuccessful && (
        <Text style={styles.submitSuccessText}>
          Email sent - please check your inbox.
        </Text>
      )}

      <FormError
        errorMessage={submitError}
        style={generalStyles.submitError}
      />

    </Form>
  );
}

ForgotPasswordScreen.propTypes = {
  isModal: PropTypes.bool,
  onSignIn: PropTypes.func,
  readOnlyEmail: PropTypes.string,
};
