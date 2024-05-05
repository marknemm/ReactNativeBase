import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import HeaderSaveButton from '@components/header-save-button/HeaderSaveButton';
import PasswordInput from '@components/password-input/PasswordInput';
import { useMatchValidator, useSubmitState } from '@hooks/form-hooks';
import { useNavigationSubmitOptions } from '@hooks/navigation-hooks';
import { useGeneralStyles } from '@hooks/theme-hooks';
import { useUser } from '@hooks/user-hooks';
import { useForm } from 'react-hook-form';

/**
 * The {@link UpdatePasswordScreen} component.
 *
 * @param {object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The {@link UpdatePasswordScreen} component.
 */
export default function UpdatePasswordScreen({ navigation }) {
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
      <HeaderSaveButton
        disabled={!form.formState.isDirty}
        loading={submitting}
        onPress={onSave}
      />
    ),
  }, [form.formState.isDirty, onSave, submitting]);

  return (
    <Form form={form} safeArea scrollable>

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

      <FormError
        errorMessage={submitError}
        style={generalStyles.form.submitError}
      />

    </Form>
  );
}
