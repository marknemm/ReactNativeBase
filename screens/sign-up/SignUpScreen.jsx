import EmailInput from '@components/email-input/EmailInput';
import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import PasswordInput from '@components/password-input/PasswordInput';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import { useMatchValidator, useSubmitState } from '@hooks/form-hooks';
import { Button } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { signUp } from '@util/auth';
import { setLSItem } from '@util/local-storage';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * Sign up screen.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The sign up screen.
 */
export default function SignUpScreen({ navigation }) {
  const styles = useStyles();
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
        required
      />

      <PasswordInput
        containerStyle={styles.formField}
        label="Password"
        name="password"
        required
        textContentType="newPassword"
      />

      <PasswordInput
        containerStyle={styles.formField}
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
        style={styles.submitButton}
        title="Sign up"
      />

      <Button
        disabled={loading}
        onPress={() => navigation.navigate('Sign In')}
        style={generalStyles.horizontalGutter}
        title="Have an account?"
        type="clear"
      />

      <FormError
        errorMessage={submitError}
        style={generalStyles.submitError}
      />

    </Form>
  );
}
