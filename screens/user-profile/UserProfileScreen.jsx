import Avatar from '@components/avatar/Avatar';
import EmailInput from '@components/email-input/EmailInput';
import EmailVerification from '@components/email-verification/EmailVerification';
import FormError from '@components/form-error/FormError';
import HeaderSaveButton from '@components/header-save-button/HeaderSaveButton';
import Input from '@components/input/Input';
import PhoneInput from '@components/phone-input/PhoneInput';
import ScreenView from '@components/screen-view/ScreenView';
import { APPLE_ICON, CHECK_ICON, GMAIL_ICON, LOCATION_ICON, PASSWORD_ICON } from '@constants/icons';
import { useAuthRefresh } from '@hooks/auth-hooks';
import { useSubmitState } from '@hooks/form-hooks';
import { useNavigationConfirm, useNavigationSubmitOptions } from '@hooks/navigation-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { useUser } from '@hooks/user-hooks';
import { Icon, ListItem } from '@rneui/themed';
import { linkWithApple, linkWithGoogle } from '@util/auth';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The user profile screen.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The user profile screen.
 */
export default function UserProfileScreen({ navigation }) {
  const styles = useStyles();
  const generalStyles = useGeneralStyles();
  const user = useUser();
  const form = useForm({
    defaultValues: {
      displayName: user?.displayName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      photoURL: user?.photoURL,
    },
  });
  const { handleSubmit, handleSubmitState, submitError, submitting } = useSubmitState(form);

  // Refresh the user at a regular 3 sec. interval if the email is not verified
  useAuthRefresh(!user.emailVerified && !submitting);

  // Setup form submit handler
  const onSave = handleSubmit(async (formData) => {
    await user.save(formData);
    form.reset(formData); // Makes form pristine
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
    <ScreenView form={form}>

      <Avatar
        backgroundColor={user?.backgroundColor}
        containerStyle={styles.avatar}
        description="Profile Picture"
        editable={!submitting}
        name="photoURL"
        rounded
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

      <View style={generalStyles.view.fullWidth}>
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
        <ListItem
          bottomDivider
          disabled={submitting || user.isLinkedWithGoogle}
          onPress={handleSubmitState(linkWithGoogle)}
        >
          <Icon {...GMAIL_ICON} color="gray" />
          <ListItem.Content>
            <ListItem.Title>
              {user.isLinkedWithGoogle
                ? 'Google Account Linked'
                : 'Link Google Account'}
            </ListItem.Title>
          </ListItem.Content>
          {user.isLinkedWithGoogle
            ? <Icon {...CHECK_ICON} iconStyle={styles.checkIcon} />
            : <ListItem.Chevron />}
        </ListItem>
        <ListItem
          bottomDivider
          disabled={submitting || user.isLinkedWithApple}
          onPress={handleSubmitState(linkWithApple)}
        >
          <Icon {...APPLE_ICON} color="gray" />
          <ListItem.Content>
            <ListItem.Title>
              {user.isLinkedWithApple
                ? 'Apple Account Linked'
                : 'Link Apple Account'}
            </ListItem.Title>
          </ListItem.Content>
          {user.isLinkedWithApple
            ? <Icon {...CHECK_ICON} iconStyle={styles.checkIcon} />
            : <ListItem.Chevron />}
        </ListItem>
        {/* <ListItem
          bottomDivider
          disabled={submitting}
          onPress={handleSubmitState(linkWithFacebook)}
        >
          <Icon {...FACEBOOK_ICON} color="gray" />
          <ListItem.Content>
            <ListItem.Title>Link Facebook Account</ListItem.Title>
          </ListItem.Content>
          {user.isLinkedWithFacebook
            ? <Icon {...CHECK_ICON} iconStyle={styles.checkIcon} />
            : <ListItem.Chevron />}
        </ListItem> */}
      </View>

      <FormError
        errorMessage={submitError}
        style={generalStyles.form.submitError}
      />

    </ScreenView>
  );
}
