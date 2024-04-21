import Avatar from '@components/avatar/Avatar';
import EmailInput from '@components/email-input/EmailInput';
import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import Input from '@components/input/Input';
import PhoneInput from '@components/phone-input/PhoneInput';
import { PASSWORD_ICON } from '@constants/icons';
import { useSubmitState } from '@hooks/form-hooks';
import { useNavigationConfirm, useNavigationOptions } from '@hooks/navigation-hooks';
import { useUser } from '@hooks/user-hooks';
import { Button, Icon, ListItem } from '@rneui/themed';
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
  const { handleSubmit, submitError, submitting } = useSubmitState(form);

  // Setup form submit handler
  const onSave = handleSubmit(async (formData) => {
    await user.save(formData);
    form.reset(form.getValues()); // Makes form pristine
    navigation.goBack();
  });

  // Disable navigation on submit
  useNavigationOptions({
    gestureEnabled: false,
    headerBackVisible: false,
  }, submitting, []);

  // Change navigation header buttons when form is dirty to Cancel and Save
  useNavigationOptions({
    headerBackTitle: 'Cancel',
    headerRight: () => (
      <Button
        loading={submitting}
        onPress={onSave}
        title="Save"
      />
    ),
  },
  form.formState.isDirty, // Only set the navigation options when the form is dirty
  [onSave, submitting]);

  useNavigationConfirm(form.formState.isDirty); // Confirm navigation when the form is dirty

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

      <EmailInput
        disabled={submitting}
        label="Email"
        name="email"
        required
      />

      <PhoneInput
        disabled={submitting}
        label="Phone Number"
        name="phoneNumber"
      />

      {user.hasPassword && (
        <ListItem
          bottomDivider
          disabled={submitting}
          onPress={() => navigation.navigate('Update Password')}
          topDivider
        >
          <Icon {...PASSWORD_ICON} color="gray" />
          <ListItem.Content>
            <ListItem.Title>Update Password</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}

      <FormError errorMessage={submitError} style={styles.formError} />
    </Form>
  );
}
