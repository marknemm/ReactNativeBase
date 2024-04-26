import AddButton from '@components/add-button/AddButton';
import { useScreenOptions } from '@hooks/navigation-hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDogScreen from '@screens/add-dog/AddDogScreen';
import DogsScreen from '@screens/dogs/DogsScreen';

const Stack = createNativeStackNavigator();

/**
 * The {@link MainStack} navigation.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The {@link MainStack} navigation.
 */
export default function MainStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={useScreenOptions()}>
      <Stack.Screen
        name="Dogs"
        component={DogsScreen}
        options={{
          headerRight: () => (
            <AddButton
              onPress={() => navigation.navigate('Add Dog')}
              backgroundColor="transparent"
              size={28}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Add Dog"
        component={AddDogScreen}
      />
    </Stack.Navigator>
  );
}
