import FormError from '@components/form-error/FormError';
import Input from '@components/input/Input';
import { EMAIL_REGEX } from '@constants/regex';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import FormProvider from '@contexts/form/FormProvider';
import { Button } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { signUp } from '@util/auth';
import { setLSItem } from '@util/local-storage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * Sign up screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
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
  const [submitErr, setSubmitErr] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
        containerStyle={styles.formField}
        keyboardType="email-address"
        label="Email"
        name="email"
        rules={{ required: 'Email is required', pattern: EMAIL_REGEX }}
        rulesErrorMessageMap={{ pattern: 'Invalid email address' }}
        textContentType="emailAddress"
      />

      <Input
        autoCapitalize="none"
        autoComplete="new-password"
        autoCorrect={false}
        containerStyle={styles.formField}
        label="Password"
        name="password"
        rules={{ minLength: 6, required: 'Password is required' }}
        rulesErrorMessageMap={{ minLength: 'Password must be at least 6 characters' }}
        secureTextEntry
        textContentType="newPassword"
      />

      <Input
        autoCapitalize="none"
        autoComplete="new-password"
        autoCorrect={false}
        containerStyle={styles.formField}
        label="Confirm Password"
        name="confirmPassword"
        rules={{
          required: 'Confirm password is required',
          validate: (value) => value === form.getValues().password || 'Passwords must match',
        }}
        secureTextEntry
        textContentType="newPassword"
      />

      <Button
        onPress={form.handleSubmit(async ({ email, password }) => {
          setSubmitErr('');
          setSubmitting(true);

          try {
            await signUp(email, password);
            setLSItem(AUTH_SIGN_IN_LAST_EMAIL_KEY, email);
          } catch (error) {
            setSubmitErr(error.message);
            setSubmitting(false);
          }
        })}
        style={styles.submitButton}
        title="Sign up"
      />

      <Button
        disabled={submitting}
        onPress={() => navigation.navigate('Sign In')}
        style={generalStyles.horizontalGutter}
        title="Have an account?"
        type="clear"
      />

      <FormError errorMessage={submitErr} style={styles.formError} />
    </FormProvider>
  );
}
