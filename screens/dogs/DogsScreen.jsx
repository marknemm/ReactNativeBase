import { Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Dogs (home) screen.
 *
 * @param {Object} param0 The component properties.
 * @param {import('@typedefs/navigation').Navigation} param0.navigation The navigation object.
 * @returns {React.JSX.Element} The dogs (home) screen.
 */
export default function DogsScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>My Pets</Text>
    </SafeAreaView>
  );
}
