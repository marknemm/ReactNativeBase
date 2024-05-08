import AddButton from '@components/add-button/AddButton';
import { useScreenOptions } from '@hooks/navigation-hooks';
import { ScreenProps } from '@interfaces/screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDogScreen from '@screens/add-dog/AddDogScreen';
import HomeScreen from '@screens/home/HomeScreen';

const Stack = createNativeStackNavigator();

/**
 * The main stack navigator for the application.
 *
 * Contains screens associated with the main functionality of the app and the default selected bottom tab.
 */
const MainStack: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={useScreenOptions()}>
      <Stack.Screen
        name="Dogs"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <AddButton
              onPress={() => navigation.navigate('Add Dog')}
              iconColor="white"
              iconSize={28}
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

export default MainStack;
