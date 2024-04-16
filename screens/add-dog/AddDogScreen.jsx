import Dropdown from '@components/dropdown/Dropdown';
import Input from '@components/input/Input';
import { WEIGHT_UNITS } from '@constants/units';
import FormProvider from '@contexts/form/FormProvider';
import { Button } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { log } from '@util/log';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The screen for adding dogs.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
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

  return (
    <FormProvider form={form} style={generalStyles.verticalGutter}>
      <Input
        name="name"
        placeholder="Name"
        rules={{ required: 'Dog name is required' }}
      />

      <Input
        name="breed"
        placeholder="Breed"
      />

      <Input
        keyboardType="number-pad"
        name="age"
        placeholder="Age"
        rules={{ pattern: /[0-9]+/, min: 0 }}
        rulesErrorMessageMap={{ pattern: 'The age must be a whole number' }}
      />

      <View style={generalStyles.row}>
        <View style={styles.weightInputContainer}>
          <Input
            keyboardType="numeric"
            name="weight"
            placeholder="Weight"
            rules={{ pattern: /\d+/, min: 0 }}
            rulesErrorMessageMap={{ pattern: 'The weight must be a number' }}
          />
        </View>

        <View style={styles.weightUnitsDropdownContainer}>
          <Dropdown
            data={WEIGHT_UNITS}
            name="weightUnits"
            placeholder="Units"
            rules={{ required: true }}
            value={WEIGHT_UNITS[0]}
          />
        </View>
      </View>

      <Button
        onPress={form.handleSubmit((data) => { log(data); })}
        style={generalStyles.horizontalGutter}
        title="Save Dog"
      />
    </FormProvider>
  );
}
