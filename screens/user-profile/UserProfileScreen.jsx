import FormError from '@components/form-error/FormError';
import Input from '@components/input/Input';
import { EMAIL_REGEX, PHONE_REGEX } from '@constants/regex';
import FormProvider from '@contexts/form/FormProvider';
import { useUser } from '@hooks/user-hooks';
import { Avatar, Button } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { signup } from '@util/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from './styles';

/**
 * The user profile screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The user profile screen.
 */
export default function UserProfileScreen({ navigation }) {
  const user = useUser();
  const form = useForm({
    defaultValues: {
      displayName: user?.displayName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      photoURL: user?.photoURL,
      password: '',
      confirmPassword: '',
    },
  });
  const [signupErr, setSignupErr] = useState('');
  const [signupSubmitting, setSignupSubmitting] = useState(false);

  return (
    <FormProvider
      form={form}
      safeArea
      style={generalStyles.screenContainer}
    >
      <Avatar
        size="large"
        rounded
        title={user.initials}
      />

      <Input
        autoCapitalize="words"
        autoComplete="name"
        autoCorrect={false}
        label="Name"
        name="displayName"
        rules={{ required: 'Name is required' }}
      />

      <Input
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        name="email"
        rules={{ required: 'Email is required', pattern: EMAIL_REGEX }}
        rulesErrorMessageMap={{ pattern: 'Invalid email address' }}
      />

      <Input
        autoComplete="tel"
        autoCorrect={false}
        keyboardType="phone-pad"
        label="Phone Number"
        name="phoneNumber"
        rules={{ required: 'Phone number is required', pattern: PHONE_REGEX }}
        rulesErrorMessageMap={{ pattern: 'Invalid phone number' }}
      />

      <Input
        autoCapitalize="none"
        autoComplete="new-password"
        autoCorrect={false}
        label="Password"
        name="password"
        rules={{ minLength: 6, required: 'Password is required' }}
        rulesErrorMessageMap={{ minLength: 'Password must be at least 6 characters' }}
        secureTextEntry
      />

      <Input
        autoCapitalize="none"
        autoComplete="new-password"
        autoCorrect={false}
        label="Confirm Password"
        name="confirmPassword"
        rules={{
          required: 'Confirm password is required',
          validate: (value) => value === form.getValues().password || 'Passwords must match',
        }}
        secureTextEntry
      />

      <Button
        onPress={form.handleSubmit(async (formData) => {
          setSignupErr('');
          setSignupSubmitting(true);

          try {
            await signup(formData);
          } catch (error) {
            setSignupErr(error.message);
          } finally {
            setSignupSubmitting(false);
          }
        })}
        style={generalStyles.horizontalGutter}
        title="Signup"
      />

      <Button
        disabled={signupSubmitting}
        onPress={() => navigation.navigate('Login')}
        style={generalStyles.horizontalGutter}
        title="Have an account?"
        type="clear"
      />

      <FormError errorMessage={signupErr} style={styles.formError} />
    </FormProvider>
  );
}
