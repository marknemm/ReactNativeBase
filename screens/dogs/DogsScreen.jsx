import { Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Dogs (home) screen.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The dogs (home) screen.
 */
export default function DogsScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>My Pets</Text>
    </SafeAreaView>
  );
}
