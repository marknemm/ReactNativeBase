import EmailInput from '@components/email-input/EmailInput';
import FormError from '@components/form-error/FormError';
import PasswordInput from '@components/password-input/PasswordInput';
import ScreenView from '@components/screen-view/ScreenView';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import { useMatchValidator, useSubmitState } from '@hooks/form-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { ScreenProps } from '@interfaces/screen';
import { Button } from '@rneui/themed';
import { signUp } from '@util/auth';
import { setLSItem } from '@util/local-storage';
import { useForm } from 'react-hook-form';

/**
 * Sign up screen.
 */
const SignUpScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const generalStyles = useGeneralStyles();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { handleSubmit, submitError, submitSuccessful, submitting } = useSubmitState(form);
  const loading = submitting || submitSuccessful;

  return (
    <ScreenView form={form} noFooter>

      <EmailInput
        label="Email"
        name="email"
        required
      />

      <PasswordInput
        label="Password"
        name="password"
        required
        textContentType="newPassword"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        required
        textContentType="newPassword"
        validate={useMatchValidator(form, 'password', 'Passwords must match')}
      />

      <Button
        loading={loading}
        onPress={handleSubmit(async ({ email, password }) => {
          await signUp(email, password);
          setLSItem(AUTH_SIGN_IN_LAST_EMAIL_KEY, email);
        })}
        style={generalStyles.form.submitButton}
        title="Sign up"
      />

      <Button
        disabled={loading}
        onPress={() => navigation.navigate('Sign In')}
        title="Have an account?"
        type="clear"
      />

      <FormError
        errorMessage={submitError}
        style={generalStyles.form.submitError}
      />

    </ScreenView>
  );
}

export default SignUpScreen;
