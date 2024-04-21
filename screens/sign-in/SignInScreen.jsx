import EmailInput from '@components/email-input/EmailInput';
import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import PasswordInput from '@components/password-input/PasswordInput';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import { useSubmitState } from '@hooks/form-hooks';
import { useLSState } from '@hooks/local-storage-hooks';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Button, useThemeMode } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { signInWithApple, signInWithEmailAndPassword, signInWithGoogle } from '@util/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonStyle, AppleAuthenticationButtonType } from 'expo-apple-authentication';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * Sign in screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The sign in screen.
 */
export default function SignInScreen({ navigation }) {
  const styles = useStyles();
  const [lastSignInEmail, setLSLastSignInEmail] = useLSState(AUTH_SIGN_IN_LAST_EMAIL_KEY, { defaultValue: '' });
  const form = useForm({
    defaultValues: {
      email: lastSignInEmail,
      password: '',
    },
  });
  const { handleSubmit, handleSubmitState, submitError, submitSuccessful, submitting } = useSubmitState(form);
  const loading = submitting || submitSuccessful;

  const { mode: themeMode } = useThemeMode();
  const appleButtonStyle = themeMode === 'dark'
    ? AppleAuthenticationButtonStyle.WHITE
    : AppleAuthenticationButtonStyle.BLACK;

  return (
    <Form
      form={form}
      safeArea
      scrollable
      style={generalStyles.screenContainer}
    >
      <View style={styles.oauthProvidersView}>
        <GoogleSigninButton
          color={GoogleSigninButton.Color.Dark}
          onPress={handleSubmitState(signInWithGoogle)}
          size={GoogleSigninButton.Size.Wide}
          style={styles.googleProviderButton}
        />
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={appleButtonStyle}
          cornerRadius={2}
          onPress={handleSubmitState(signInWithApple)}
          style={styles.oauthProviderButton}
        />
        {/* <FacebookLoginButton
          style={styles.oauthProviderButton}
          onLoginFinished={(error, result) => handleSignIn(() => signInWithFacebook(error, result))}
        /> */}
      </View>

      <EmailInput
        containerStyle={styles.formField}
        label="Email"
        name="email"
        required
        textContentType="username"
      />

      <PasswordInput
        containerStyle={styles.formField}
        label="Password"
        name="password"
        required
      />

      <Button
        loading={loading}
        onPress={handleSubmit(async ({ email, password }) => {
          const authUser = await signInWithEmailAndPassword(email, password);
          setLSLastSignInEmail(email);
          return authUser;
        })}
        style={styles.submitButton}
        title="Sign In"
      />

      <Button
        disabled={loading}
        onPress={() => navigation.navigate('Sign Up')}
        style={generalStyles.horizontalGutter}
        title="Don&apos;t have an account?"
        type="clear"
      />

      <Button
        disabled={loading}
        onPress={() => navigation.navigate('Forgot Password')}
        style={generalStyles.horizontalGutter}
        title="Forgot password?"
        type="clear"
      />

      <FormError errorMessage={submitError} style={styles.formError} />
    </Form>
  );
}
