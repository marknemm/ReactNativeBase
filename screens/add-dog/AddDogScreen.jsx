import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * The screen for adding dogs.
 *
 * @param {Object} param0 The component properties.
 * @param {import('@typedefs/navigation').Navigation} param0.navigation The navigation object.
 * @returns {React.JSX.Element} The screen for adding dogs.
 */
export default function AddDogScreen({ navigation }) {
  return (
    <SafeAreaView>
      <TextInput placeholder="Name" />
      <TextInput placeholder="Breed" />
      <TextInput placeholder="Age" />
    </SafeAreaView>
  );
}
