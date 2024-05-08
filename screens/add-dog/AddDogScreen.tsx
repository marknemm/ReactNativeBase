import Dropdown from '@components/dropdown/Dropdown';
import FormError from '@components/form-error/FormError';
import Input from '@components/input/Input';
import ScreenView from '@components/screen-view/ScreenView';
import { POSITIVE_DECIMAL_REGEX, POSITIVE_WHOLE_NUMBER_REGEX } from '@constants/regex';
import { WEIGHT_UNITS } from '@constants/units';
import { useSubmitState, useValidationRule } from '@hooks/form-hooks';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { Button } from '@rneui/themed';
import { log } from '@util/log';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScreenProps } from '@interfaces/screen';
import { useStyles } from './styles';

/**
 * The screen for adding dogs.
 *
 * @param props The {@link ScreenProps}.
 * @returns The {@link AddDogScreen} component.
 */
const AddDogScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const styles = useStyles();
  const generalStyles = useGeneralStyles();
  const form = useForm({
    defaultValues: {
      name: '',
      breed: '',
      age: null,
      weight: null,
      weightUnits: WEIGHT_UNITS[0],
    },
  });
  const { handleSubmit, submitError, submitting } = useSubmitState(form);

  return (
    <ScreenView form={form}>

      <Input
        autoCapitalize="words"
        autoComplete="name"
        autoCorrect={false}
        label="Name"
        name="name"
        placeholder='e.g. "Fido" or "Spot"'
        required
      />

      <Input
        autoCapitalize="words"
        label="Breed"
        name="breed"
        placeholder='e.g. "Golden Retriever" or "Pit Bull"'
      />

      <Input
        keyboardType="number-pad"
        label="Age"
        name="age"
        min={0}
        pattern={useValidationRule({
          message: 'Age must be a whole number',
          value: POSITIVE_WHOLE_NUMBER_REGEX,
        })}
      />

      <View style={generalStyles.view.row}>
        <Input
          containerStyle={generalStyles.view.flexItem2}
          keyboardType="numeric"
          label="Weight"
          min={0}
          name="weight"
          pattern={useValidationRule({
            message: 'Weight must be a number',
            value: POSITIVE_DECIMAL_REGEX,
          })}
        />

        <Dropdown
          containerStyle={styles.weightUnitsDropdownContainer}
          data={WEIGHT_UNITS}
          label="Units"
          name="weightUnits"
          required
        />
      </View>

      <Button
        loading={submitting}
        onPress={handleSubmit((data) => { log(data); })}
        style={generalStyles.form.submitButton}
        title="Save Dog"
      />

      <FormError
        errorMessage={submitError}
        style={generalStyles.form.submitError}
      />

    </ScreenView>
  );
};

export default AddDogScreen;
