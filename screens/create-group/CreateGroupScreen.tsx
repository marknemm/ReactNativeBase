import ErrorText from '@components/error-text/ErrorText';
import HeaderActionButton from '@components/header-action-button/HeaderActionButton';
import Input from '@components/input/Input';
import ScreenView from '@components/screen-view/ScreenView';
import { useSubmitState } from '@hooks/form-hooks';
import { useNavigationSubmitOptions } from '@hooks/navigation-hooks';
import { useUser } from '@hooks/user-hooks';
import { ScreenProps } from '@interfaces/screen';
import { createGroup } from '@util/group';
import { useForm } from 'react-hook-form';

/**
 * A screen that creates a `Group`.
 *
 * @returns The {@link CreateGroupScreen} component.
 */
const CreateGroupScreen: React.FC<ScreenProps> = () => {
  const user = useUser();
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const { handleSubmit, submitError, submitting } = useSubmitState(form);

  const onCreate = handleSubmit(async (formData) => {
    await createGroup(formData, user);
  });

  useNavigationSubmitOptions(submitting, {
    headerBackTitle: 'Cancel',
    headerRight: () => (
      <HeaderActionButton
        loading={submitting}
        onPress={onCreate}
        title="Create"
      />
    ),
  }, [onCreate, submitting]);

  return (
    <ScreenView form={form}>

      <Input
        label="Name"
        name="name"
        required
      />

      <Input
        label="Description"
        maxLength={1000}
        multiline
        name="description"
      />

      <ErrorText
        center
        error={submitError}
      />

    </ScreenView>
  );
};

export default CreateGroupScreen;
