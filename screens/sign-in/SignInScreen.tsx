import EmailInput from '@components/email-input/EmailInput';
import FormError from '@components/form-error/FormError';
import PasswordInput from '@components/password-input/PasswordInput';
import ScreenView from '@components/screen-view/ScreenView';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import { useSubmitState } from '@hooks/form-hooks';
import { useLSState } from '@hooks/local-storage-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { ScreenProps } from '@interfaces/screen';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Button, useThemeMode } from '@rneui/themed';
import { signInWithApple, signInWithEmailAndPassword, signInWithGoogle } from '@util/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonStyle, AppleAuthenticationButtonType } from 'expo-apple-authentication';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * Screen for signing in.
 *
 * @param props The {@link Props}.
 * @returns The {@link SignInScreen} component.
 */
const SignInScreen: React.FC<Props> = ({
  isModal,
  isPasswordOnly = false,
  navigation,
  onForgotPassword,
  onSignIn,
  readOnlyEmail,
}) => {
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
};

/**
 * The {@link SignInScreen} component properties.
 */
interface Props extends ScreenProps {

  /**
   * Whether the screen is a modal.
   */
  isModal?: boolean;

  /**
   * Whether to show only the (email) password sign-in.
   */
  isPasswordOnly?: boolean;

  /**
   * The function to call when the user clicks the forgot password button.
   */
  onForgotPassword?: () => void;

  /**
   * The function to call after signing in.
   *
   * @param authUser The authenticated {@link FirebaseAuthTypes.User}.
   */
  onSignIn?: (authUser: FirebaseAuthTypes.User) => void;

  /**
   * The email address that must be used for sign in.
   */
  readOnlyEmail?: string;

}

export default SignInScreen;
