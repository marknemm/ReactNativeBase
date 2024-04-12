import FormError from '@components/form-error/FormError';
import Input from '@components/input/Input';
import { EMAIL_REGEX } from '@constants/regex';
import FormProvider from '@contexts/form/FormProvider';
import { useLSState } from '@hooks/local-storage-hooks';
import { Button } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { login, loginAnonymously } from '@util/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { styles } from './styles';

/**
 * Login screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The login screen.
 */
export default function LoginScreen({ navigation }) {
  const [lastLoginEmail, setLSLastLoginEmail] = useLSState('auth.login.lastLoginEmail', { defaultValue: '' });
  const form = useForm({
    defaultValues: {
      email: lastLoginEmail,
      password: '',
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState('');

  return (
    <FormProvider
      form={form}
      safeArea
      style={generalStyles.screenContainer}
    >
      <Input
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        containerStyle={generalStyles.bottomGutter}
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
        containerStyle={generalStyles.bottomGutter}
        label="Password"
        name="password"
        placeholder=""
        rules={{ minLength: 6, required: 'Password is required' }}
        rulesErrorMessageMap={{ minLength: 'Password must be at least 6 characters' }}
        secureTextEntry
        textContentType="password"
      />

      <Button
        loading={submitting}
        onPress={form.handleSubmit(async ({ email, password }) => {
          setSubmitErr('');
          setSubmitting(true);

          try {
            await login(email, password);
            setLSLastLoginEmail(email);
          } catch (error) {
            setSubmitErr(error.message);
            setSubmitting(false);
          }
        })}
        style={[generalStyles.horizontalGutter, generalStyles.bottomGutter]}
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
          onPress={async () => {
            setSubmitErr('');
            setSubmitting(true);

            try {
              await loginAnonymously();
            } catch (error) {
              setSubmitErr(error.message);
              setSubmitting(false);
            }
          }}
          style={[styles.skipLogin, generalStyles.horizontalGutter]}
          title="Skip Login"
          type="clear"
        />
      </View>
    </FormProvider>
  );
}
