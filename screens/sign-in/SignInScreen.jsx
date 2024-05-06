import EmailInput from '@components/email-input/EmailInput';
import FormError from '@components/form-error/FormError';
import PasswordInput from '@components/password-input/PasswordInput';
import ScreenView from '@components/screen-view/ScreenView';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import { useSubmitState } from '@hooks/form-hooks';
import { useLSState } from '@hooks/local-storage-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Button, useThemeMode } from '@rneui/themed';
import { signInWithApple, signInWithEmailAndPassword, signInWithGoogle } from '@util/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonStyle, AppleAuthenticationButtonType } from 'expo-apple-authentication';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * Sign in screen.
 *
 * @param {Object} props The component properties.
 * @param {boolean} [props.isModal] Whether the screen is a modal.
 * @param {boolean} [props.isPasswordOnly=false] Whether to show only the (email) password sign-in. Defaults to `false`.
 * @param {Types.Navigation.StackNavigation} [props.navigation] The {@link Types.Navigation.StackNavigation navigation} object.
 * @param {() => void} [props.onForgotPassword] The function to call when the user clicks the forgot password button.
 * @param {(authUser: FirebaseAuthTypes.User) => void} [props.onSignIn] The function to call after signing in.
 * @param {string} [props.readOnlyEmail] The email address that must be used for sign in.
 * @returns {React.JSX.Element} The sign in screen.
 */
export default function SignInScreen({
  isModal,
  isPasswordOnly = false,
  navigation,
  onForgotPassword,
  onSignIn,
  readOnlyEmail,
}) {
  const styles = useStyles();
  const generalStyles = useGeneralStyles();
  const [lastSignInEmail, setLSLastSignInEmail] = useLSState(AUTH_SIGN_IN_LAST_EMAIL_KEY, { defaultValue: '' });
  const form = useForm({
    defaultValues: {
      email: readOnlyEmail || lastSignInEmail,
      password: '',
    },
  });
  const { handleSubmit, handleSubmitState, submitError, submitSuccessful, submitting } = useSubmitState(form, onSignIn);
  const loading = submitting || submitSuccessful;

  const { mode: themeMode } = useThemeMode();
  const appleButtonStyle = themeMode === 'dark'
    ? AppleAuthenticationButtonStyle.WHITE
    : AppleAuthenticationButtonStyle.BLACK;

  return (
    <ScreenView form={form} noFooter>

      {!isPasswordOnly && (
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
      )}

      <EmailInput
        label="Email"
        name="email"
        readOnly={!!readOnlyEmail}
        required
        textContentType="username"
      />

      <PasswordInput
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
        containerStyle={generalStyles.form.submitButton}
        title="Sign In"
      />

      {!isModal && ( // Can't navigate to sign up from modal
        <Button
          disabled={loading}
          onPress={() => navigation.navigate('Sign Up')}
          title="Don&apos;t have an account?"
          type="clear"
        />
      )}

      <Button
        disabled={loading}
        onPress={() => {
          if (!isModal) { // Can't navigate to forgot password from a modal
            navigation.navigate('Forgot Password');
          }
          onForgotPassword?.();
        }}
        title="Forgot password?"
        type="clear"
      />

      <FormError
        errorMessage={submitError}
        style={generalStyles.form.submitError}
      />

    </ScreenView>
  );
}

SignInScreen.propTypes = {
  isModal: PropTypes.bool,
  isPasswordOnly: PropTypes.bool,
  onForgotPassword: PropTypes.func,
  onSignIn: PropTypes.func,
  readOnlyEmail: PropTypes.string,
};
