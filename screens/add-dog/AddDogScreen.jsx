import Dropdown from '@components/dropdown/Dropdown';
import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import Input from '@components/input/Input';
import { POSITIVE_DECIMAL_REGEX, POSITIVE_WHOLE_NUMBER_REGEX } from '@constants/regex';
import { WEIGHT_UNITS } from '@constants/units';
import { useSubmitState, useValidationRule } from '@hooks/form-hooks';
import { Button } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { log } from '@util/log';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The screen for adding dogs.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The screen for adding dogs.
 */
export default function AddDogScreen({ navigation }) {
  const styles = useStyles();
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
    <Form
      form={form}
      safeArea
      scrollable
      style={generalStyles.verticalGutter}
    >

      <Input
        autoCapitalize="words"
        autoComplete="name"
        autoCorrect={false}
        containerStyle={generalStyles.formField}
        label="Name"
        name="name"
        required
      />

      <Input
        autoCapitalize="words"
        containerStyle={generalStyles.formField}
        label="Breed"
        name="breed"
      />

      <Input
        containerStyle={generalStyles.formField}
        keyboardType="number-pad"
        label="Age"
        name="age"
        min={0}
        pattern={useValidationRule({
          message: 'Age must be a whole number',
          value: POSITIVE_WHOLE_NUMBER_REGEX,
        })}
      />

      <View style={generalStyles.row}>
        <View style={styles.weightInputContainer}>
          <Input
            containerStyle={generalStyles.formField}
            keyboardType="numeric"
            label="Weight"
            min={0}
            name="weight"
            pattern={useValidationRule({
              message: 'Weight must be a number',
              value: POSITIVE_DECIMAL_REGEX,
            })}
          />
        </View>

        <View style={styles.weightUnitsDropdownContainer}>
          <Dropdown
            data={WEIGHT_UNITS}
            label="Units"
            name="weightUnits"
            required
          />
        </View>
      </View>

      <Button
        loading={submitting}
        onPress={handleSubmit((data) => { log(data); })}
        style={generalStyles.submitButton}
        title="Save Dog"
      />

      <FormError
        errorMessage={submitError}
        style={generalStyles.submitError}
      />

    </Form>
  );
}
