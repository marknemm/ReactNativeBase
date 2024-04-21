import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import PasswordInput from '@components/password-input/PasswordInput';
import { useSubmitState } from '@hooks/form-hooks';
import { useNavigationOptions } from '@hooks/navigation-hooks';
import { Button } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { updatePassword } from '@util/auth';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * The {@link UpdatePasswordScreen} component.
 *
 * @param {object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The {@link UpdatePasswordScreen} component.
 */
export default function UpdatePasswordScreen({ navigation }) {
  const styles = useStyles();
  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { handleSubmit, submitError, submitting } = useSubmitState(form);

  const onSave = handleSubmit(async (formData) => {
    await updatePassword(formData.currentPassword, formData.newPassword);
    navigation.goBack();
  });

  useNavigationOptions({
    headerRight: () => (
      <Button
        disabled={submitting || !form.formState.isDirty}
        loading={submitting}
        onPress={onSave}
        title="Save"
        titleStyle={generalStyles.white}
        type="clear"
      />
    ),
  }, [form.formState.isValid, onSave, submitting]);

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
        rules={{
          required: 'Confirm Password is required',
          validate: (value) => value === form.getValues().newPassword || 'Passwords must match',
        }}
        textContentType="newPassword"
      />

      <FormError errorMessage={submitError} style={styles.formError} />
    </Form>
  );
}
