import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import HeaderSaveButton from '@components/header-save-button/HeaderSaveButton';
import Input from '@components/input/Input';
import { useSubmitState } from '@hooks/form-hooks';
import { useNavigationSubmitOptions } from '@hooks/navigation-hooks';
import { useUser } from '@hooks/user-hooks';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * The {@link AddressScreen}.
 *
 * @param {object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The {@link AddressScreen}.
 */
export default function AddressScreen({ navigation }) {
  const styles = useStyles();
  const user = useUser();
  const form = useForm({
    defaultValues: {
      street: '',
      apartmentSuite: '',
      city: '',
      state: '',
      zip: '',
      ...user?.address,
    },
  });
  const { handleSubmit, submitError, submitting } = useSubmitState(form);

  const onSave = handleSubmit(async (formData) => {
    await user.save({ address: formData });
    navigation.goBack();
  });

  // Change navigation options to accommodate a (form) submit screen
  useNavigationSubmitOptions(submitting, {
    headerRight: () => (
      <HeaderSaveButton
        loading={submitting}
        onPress={onSave}
      />
    ),
  }, [form.formState.isDirty, onSave, submitting]);

  return (
    <Form form={form} safeArea scrollable>

      <Input
        autoCapitalize="words"
        autoComplete="address-line1"
        label="Street Address"
        name="street"
        textContentType="streetAddressLine1"
      />

      <Input
        autoCapitalize="words"
        autoComplete="address-line2"
        label="Apartment/Suite"
        name="apartmentSuite"
        textContentType="streetAddressLine2"
      />

      <Input
        autoCapitalize="words"
        autoComplete="postal-address-locality"
        label="City"
        name="city"
        textContentType="addressCity"
      />

      <Input
        autoCapitalize="words"
        autoComplete="postal-address-region"
        label="State"
        name="state"
        textContentType="addressState"
      />

      <Input
        autoComplete="postal-code"
        keyboardType="number-pad"
        label="Zip Code"
        name="zip"
        textContentType="postalCode"
      />

      <FormError errorMessage={submitError} style={styles.formError} />

    </Form>
  );
}
