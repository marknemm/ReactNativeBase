import FormError from '@components/form-error/FormError';
import Input from '@components/input/Input';
import { EMAIL_REGEX } from '@constants/regex';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import FormProvider from '@contexts/form/FormProvider';
import { useLSState } from '@hooks/local-storage-hooks';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Button, useThemeMode } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { signInAnonymously, signInWithApple, signInWithEmailAndPassword, signInWithGoogle } from '@util/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonStyle, AppleAuthenticationButtonType } from 'expo-apple-authentication';
import { useState } from 'react';
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
  const [lastSignInEmail, setLSLastSignInEmail] = useLSState(AUTH_SIGN_IN_LAST_EMAIL_KEY, { defaultValue: '' });
  const form = useForm({
    defaultValues: {
      email: lastSignInEmail,
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState('');

  const { mode: themeMode } = useThemeMode();
  const appleButtonStyle = themeMode === 'dark'
    ? AppleAuthenticationButtonStyle.WHITE
    : AppleAuthenticationButtonStyle.BLACK;
  const styles = useStyles();

  /**
   * Handles a sign in button click by invoking the given `signInMethodCb` function.
   *
   * @param {() => Promise<FirebaseAuthTypes.User>} signInMethodCb The sign in method callback function.
   * @returns {Promise<void>} A promise that resolves when the sign in method callback function completes.
   */
  async function handleSignIn(signInMethodCb) {
    if (submitting) return;
    setSubmitErr('');
    setSubmitting(true);

    try {
      await signInMethodCb();
    } catch (error) {
      setSubmitErr(error.message);
      setSubmitting(false);
    }
  }

  return (
    <FormProvider
      form={form}
      safeArea
      style={generalStyles.screenContainer}
    >
      <View style={styles.oauthProvidersView}>
        <GoogleSigninButton
          color={GoogleSigninButton.Color.Dark}
          onPress={() => handleSignIn(signInWithGoogle)}
          size={GoogleSigninButton.Size.Wide}
          style={styles.googleProviderButton}
        />
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={appleButtonStyle}
          cornerRadius={2}
          onPress={() => handleSignIn(signInWithApple)}
          style={styles.oauthProviderButton}
        />
        {/* <FacebookLoginButton
          style={styles.oauthProviderButton}
          onLoginFinished={(error, result) => handleSignIn(() => signInWithFacebook(error, result))}
        /> */}
      </View>

      <Input
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        containerStyle={styles.formField}
        keyboardType="email-address"
        label="Email"
        name="email"
        rules={{ required: 'Email is required', pattern: EMAIL_REGEX }}
        rulesErrorMessageMap={{ pattern: 'Invalid email address' }}
        secureTextEntry={false}
        textContentType="username"
      />

      <Input
        autoCapitalize="none"
        autoComplete="current-password"
        autoCorrect={false}
        containerStyle={styles.formField}
        label="Password"
        name="password"
        rules={{ minLength: 6, required: 'Password is required' }}
        rulesErrorMessageMap={{ minLength: 'Password must be at least 6 characters' }}
        secureTextEntry
        textContentType="password"
      />

      <Button
        loading={submitting}
        onPress={form.handleSubmit(({ email }) =>
          handleSignIn(async () => {
            const authUser = await signInWithEmailAndPassword(email);
            setLSLastSignInEmail(email);
            return authUser;
          })
        )}
        style={styles.submitButton}
        title="Sign In"
      />

      <Button
        disabled={submitting}
        onPress={() => navigation.navigate('Sign Up')}
        style={generalStyles.horizontalGutter}
        title="Don&apos;t have an account?"
        type="clear"
      />

      <Button
        disabled={submitting}
        onPress={() => navigation.navigate('Forgot Password')}
        style={generalStyles.horizontalGutter}
        title="Forgot password?"
        type="clear"
      />

      <FormError errorMessage={submitErr} style={styles.formError} />

      <View style={generalStyles.flexEndItem}>
        <Button
          disabled={submitting}
          onPress={() => handleSignIn(signInAnonymously)}
          style={styles.skipSignInButton}
          titleStyle={styles.skipSignInText}
          title="Skip"
          type="clear"
        />
      </View>
    </FormProvider>
  );
}
