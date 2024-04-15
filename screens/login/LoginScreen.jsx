import FormError from '@components/form-error/FormError';
import Input from '@components/input/Input';
import { EMAIL_REGEX } from '@constants/regex';
import { AUTH_LOGIN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import FormProvider from '@contexts/form/FormProvider';
import { useLSState } from '@hooks/local-storage-hooks';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Button, useThemeMode } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { login, loginAnonymously, loginWithApple, loginWithGoogle } from '@util/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonStyle, AppleAuthenticationButtonType } from 'expo-apple-authentication';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * Login screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The login screen.
 */
export default function LoginScreen({ navigation }) {
  const [lastLoginEmail, setLSLastLoginEmail] = useLSState(AUTH_LOGIN_LAST_EMAIL_KEY, { defaultValue: '' });
  const form = useForm({
    defaultValues: {
      email: lastLoginEmail,
      password: '',
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
   * Handles a login button click by invoking the given `loginMethodCb` function.
   *
   * @param {() => Promise<FirebaseAuthTypes.User>} loginMethodCb The login method callback function.
   * @returns {Promise<void>} A promise that resolves when the login method callback function completes.
   */
  async function handleLogin(loginMethodCb) {
    if (submitting) return;
    setSubmitErr('');
    setSubmitting(true);

    try {
      await loginMethodCb();
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
          onPress={() => handleLogin(loginWithGoogle)}
          size={GoogleSigninButton.Size.Wide}
          style={styles.googleProviderButton}
        />
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={appleButtonStyle}
          cornerRadius={2}
          onPress={() => handleLogin(loginWithApple)}
          style={styles.oauthProviderButton}
        />
        {/* <FacebookLoginButton
          style={styles.oauthProviderButton}
          onLoginFinished={(error, result) => handleLogin(() => loginWithFacebook(error, result))}
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
        onPress={form.handleSubmit(({ email, password }) =>
          handleLogin(async () => {
            const authUser = await login(email, password);
            setLSLastLoginEmail(email);
            return authUser;
          })
        )}
        style={styles.submitButton}
        title="Login"
      />

      <Button
        disabled={submitting}
        onPress={() => navigation.navigate('Signup')}
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
          onPress={() => handleLogin(loginAnonymously)}
          style={styles.skipLoginButton}
          titleStyle={styles.skipLoginText}
          title="Skip Login"
          type="clear"
        />
      </View>
    </FormProvider>
  );
}
