import ErrorText from '@components/error-text/ErrorText';
import HeaderActionButton from '@components/header-action-button/HeaderActionButton';
import PasswordInput from '@components/password-input/PasswordInput';
import ScreenView from '@components/screen-view/ScreenView';
import { useMatchValidator, useSubmitState } from '@hooks/form-hooks';
import { useNavigationSubmitOptions } from '@hooks/navigation-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { useUser } from '@hooks/user-hooks';
import { ScreenProps } from '@interfaces/screen';
import { useForm } from 'react-hook-form';

/**
 * Update password screen.
 *
 * @param props The {@link ScreenProps}.
 * @returns The {@link UpdatePasswordScreen} component.
 */
const UpdatePasswordScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const generalStyles = useGeneralStyles();
  const user = useUser();
  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { handleSubmit, submitError, submitting } = useSubmitState(form);

  const onSave = handleSubmit(async (formData) => {
    await user.updatePassword(formData.currentPassword, formData.newPassword);
    navigation.goBack();
  });

  // Change navigation options to accommodate a (form) submit screen
  useNavigationSubmitOptions(submitting, {
    headerRight: () => (
      <HeaderActionButton
        disabled={!form.formState.isDirty}
        loading={submitting}
        onPress={onSave}
        title="Save"
      />
    ),
  }, [form.formState.isDirty, onSave, submitting]);

  return (
    <ScreenView form={form}>

      <PasswordInput
        label="Current Password"
        name="currentPassword"
        required
      />

      <PasswordInput
        label="New Password"
        name="newPassword"
        required
        textContentType="newPassword"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        required
        textContentType="newPassword"
        validate={useMatchValidator(form, 'newPassword', 'Passwords must match')}
      />

      <ErrorText
        error={submitError}
        style={generalStyles.form.submitError}
      />

    </ScreenView>
  );
};

export default UpdatePasswordScreen;
