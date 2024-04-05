import AddButton from '@components/add-button/AddButton';
import { useScreenOptions } from '@hooks/navigation-hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDogScreen from '@screens/add-dog/AddDogScreen';
import DogsScreen from '@screens/dogs/DogsScreen';

const Stack = createNativeStackNavigator();

/**
 * The stack for the dogs screens.
 *
 * @param {Object} param0 The component properties.
 * @param {import('@typedefs/navigation').Navigation} param0.navigation The navigation object.
 * @returns {React.JSX.Element} The stack for the dogs screens.
 */
export default function DogsStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={useScreenOptions()}>
      <Stack.Screen
        name="Dogs"
        component={DogsScreen}
        options={{
          headerRight: () => (
            <AddButton
              onPress={() => navigation.navigate('AddDog')}
              backgroundColor="transparent"
              size={28}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddDog"
        component={AddDogScreen}
        options={{
          title: 'Add Dog',
        }}
      />
    </Stack.Navigator>
  );
}
