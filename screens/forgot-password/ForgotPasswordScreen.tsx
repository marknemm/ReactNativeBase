import EmailInput from '@components/email-input/EmailInput';
import FormError from '@components/form-error/FormError';
import ScreenView from '@components/screen-view/ScreenView';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import { useSubmitState } from '@hooks/form-hooks';
import { useLSState } from '@hooks/local-storage-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { ScreenProps } from '@interfaces/screen';
import { Button, Text } from '@rneui/themed';
import { sendPasswordResetEmail } from '@util/auth';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * A screen that allows the user to reset their forgotten password.
 * This screen can also be displayed inside a modal dialog.
 *
 * @param props The {@link Props}.
 * @returns The {@link ForgotPasswordScreen} component.
 */
const ForgotPasswordScreen: React.FC<Props> = ({ isModal, navigation, onSignIn, readOnlyEmail }) => {
  const styles = useStyles();
  const generalStyles = useGeneralStyles();
  const [lastSignInEmail] = useLSState(AUTH_SIGN_IN_LAST_EMAIL_KEY, { defaultValue: '' });
  const form = useForm({
    defaultValues: {
      email: readOnlyEmail || lastSignInEmail,
    },
  });
  const { handleSubmit, submitError, submitSuccessful, submitting } = useSubmitState(form);

  return (
    <ScreenView form={form} noFooter>

      <EmailInput
        label="Email"
        name="email"
        readOnly={!!readOnlyEmail}
        required
        textContentType="username"
      />

      <Button
        loading={submitting}
        onPress={handleSubmit(({ email }) => sendPasswordResetEmail(email))}
        style={generalStyles.form.submitButton}
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
        style={generalStyles.form.submitError}
      />

    </ScreenView>
  );
};

/**
 * The {@link ForgotPasswordScreen} component properties.
 */
interface Props extends ScreenProps {

  /**
   * Whether the screen is a modal.
   */
  isModal?: boolean;

  /**
   * The function to call when the user presses the sign in button.
   */
  onSignIn?: () => void;

  /**
   * The email address that must be used for the forgot password.
   */
  readOnlyEmail?: string;

}

export default ForgotPasswordScreen;
