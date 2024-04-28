import { Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * The {@link HomeScreen}.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The {@link HomeScreen}.
 */
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>My Pets</Text>
    </SafeAreaView>
  );
}
