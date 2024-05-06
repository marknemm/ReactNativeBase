import ScreenView from '@components/screen-view/ScreenView';
import { Text } from '@rneui/themed';

/**
 * The {@link HomeScreen}.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The {@link HomeScreen}.
 */
export default function HomeScreen({ navigation }) {
  return (
    <ScreenView>
      <Text>My Pets</Text>
    </ScreenView>
  );
}
