import FormError from '@components/form-error/FormError';
import HeaderSaveButton from '@components/header-save-button/HeaderSaveButton';
import Input from '@components/input/Input';
import ScreenView from '@components/screen-view/ScreenView';
import { useSubmitState } from '@hooks/form-hooks';
import { useNavigationConfirm, useNavigationSubmitOptions } from '@hooks/navigation-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { useUser } from '@hooks/user-hooks';
import { ScreenProps } from '@interfaces/screen';
import { useForm } from 'react-hook-form';

/**
 * A screen that allows the user to edit their {@link Address} information.
 *
 * @param props The {@link ScreenProps}.
 * @returns The {@link AddressScreen} component.
 */
const AddressScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const generalStyles = useGeneralStyles();
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
    form.reset(formData);  // Makes form pristine
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

      <FormError
        errorMessage={submitError}
        style={generalStyles.form.submitError}
      />

    </ScreenView>
  );
};

export default AddressScreen;
