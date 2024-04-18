import Avatar from '@components/avatar/Avatar';
import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import Input from '@components/input/Input';
import { EMAIL_REGEX, PHONE_REGEX } from '@constants/regex';
import { useNavHeaderButtons } from '@hooks/navigation-hooks';
import { useUser } from '@hooks/user-hooks';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * The user profile screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The user profile screen.
 */
export default function UserProfileScreen({ navigation }) {
  const styles = useStyles();
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
  const [submitErr, setSubmitErr] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSave = form.handleSubmit(async (formData) => {
    setSubmitErr('');
    setSubmitting(true);
    navigation.setOptions({ headerBackButtonMenuEnabled: false });

    try {
      await user.save(formData);
      navigation.setOptions({ headerBackButtonMenuEnabled: true });
      navigation.goBack();
    } catch (error) {
      setSubmitErr(error.message);
    } finally {
      setSubmitting(false);
    }
  });

  useNavHeaderButtons('Cancel', 'Save', form.formState.isDirty, () => (
    <Button
      loading={submitting}
      onPress={onSave}
      title="Save"
    />
  ));

  return (
    <Form form={form} safeArea scrollable>
      <Avatar
        backgroundColor={user?.backgroundColor}
        containerStyle={styles.avatar}
        description="Profile Picture"
        editable={!submitting}
        name="photoURL"
        size="xlarge"
        title={user?.initials}
      />

      <Input
        autoCapitalize="words"
        autoComplete="name"
        autoCorrect={false}
        disabled={submitting}
        label="Name"
        name="displayName"
      />

      <Input
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        disabled={submitting}
        keyboardType="email-address"
        label="Email"
        name="email"
        rules={{ required: 'Email is required', pattern: EMAIL_REGEX }}
        rulesErrorMessageMap={{ pattern: 'Invalid email address' }}
      />

      <Input
        autoComplete="tel"
        autoCorrect={false}
        disabled={submitting}
        keyboardType="phone-pad"
        label="Phone Number"
        name="phoneNumber"
        rules={{ pattern: PHONE_REGEX }}
        rulesErrorMessageMap={{ pattern: 'Invalid phone number' }}
      />

      <FormError errorMessage={submitErr} style={styles.formError} />
    </Form>
  );
}
