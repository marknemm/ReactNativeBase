import Avatar from '@components/avatar/Avatar';
import EmailInput from '@components/email-input/EmailInput';
import EmailVerification from '@components/email-verification/EmailVerification';
import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import HeaderSaveButton from '@components/header-save-button/HeaderSaveButton';
import Input from '@components/input/Input';
import PhoneInput from '@components/phone-input/PhoneInput';
import { LOCATION_ICON, PASSWORD_ICON } from '@constants/icons';
import { useAuthRefresh } from '@hooks/auth-hooks';
import { useSubmitState } from '@hooks/form-hooks';
import { useNavigationConfirm, useNavigationSubmitOptions } from '@hooks/navigation-hooks';
import { useUser } from '@hooks/user-hooks';
import { Icon, ListItem } from '@rneui/themed';
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
    },
  });
  const { handleSubmit, submitError, submitting } = useSubmitState(form);

  // Refresh the user at a regular 3 sec. interval if the email is not verified
  useAuthRefresh(!user.emailVerified);

  // Setup form submit handler
  const onSave = handleSubmit(async (formData) => {
    await user.save(formData);
    form.reset(form.getValues()); // Makes form pristine
    navigation.goBack();
  });

  // Change navigation options to accommodate a (form) submit screen
  useNavigationSubmitOptions(submitting, {
    headerBackTitle: 'Cancel',
    headerRight: () => (
      <HeaderSaveButton
        loading={submitting}
        onPress={onSave}
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

      <EmailVerification
        containerStyle={styles.emailVerification}
        user={user}
      />

      <PhoneInput
        disabled={submitting}
        label="Phone Number"
        name="phoneNumber"
      />

      <ListItem
        bottomDivider
        disabled={submitting}
        onPress={() => navigation.navigate('Address')}
        topDivider
      >
        <Icon {...LOCATION_ICON} color="gray" />
        <ListItem.Content>
          <ListItem.Title>Address</ListItem.Title>
          {user.address && (
            <ListItem.Subtitle>
              {user.address?.street ?? ''}
            </ListItem.Subtitle>
          )}
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      {user.hasPassword && (
        <ListItem
          bottomDivider
          disabled={submitting}
          onPress={() => navigation.navigate('Update Password')}
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
