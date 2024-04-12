import { View } from 'react-native';
import { Text } from '@rneui/themed';

/**
 * About Screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The about screen.
 */
export default function AboutScreen({ navigation }) {
  return (
    <View>
      <Text>About OneCollar</Text>
    </View>
  );
}
