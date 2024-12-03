import AddButton from '@components/add-button/AddButton';
import { OPTIONS_HEADER_CREATE_CANCEL } from '@constants/navigation';
import { useScreenOptions } from '@hooks/navigation-hooks';
import { ScreenProps } from '@interfaces/screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDogScreen from '@screens/add-dog/AddDogScreen';
import CreateGroupScreen from '@screens/create-group/CreateGroupScreen';
import HomeScreen from '@screens/home/HomeScreen';
import ListGroupsScreen from '@screens/list-groups/ListGroupsScreen';

const Stack = createNativeStackNavigator();

/**
 * The main stack navigator for the application.
 *
 * Contains screens associated with the main functionality of the app and the default selected bottom tab.
 *
 * @param props The {@link ScreenProps}.
 * @returns The {@link MainStack} component.
 */
const MainStack: React.FC<ScreenProps> = ({ navigation }) => (
  <Stack.Navigator screenOptions={useScreenOptions()}>
    <Stack.Screen
      name="Home"
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
      name="Create Group"
      component={CreateGroupScreen}
      options={OPTIONS_HEADER_CREATE_CANCEL}
    />
    <Stack.Screen
      name="List Groups"
      component={ListGroupsScreen}
    />
    <Stack.Screen
      name="Add Dog"
      component={AddDogScreen}
    />
  </Stack.Navigator>
);

export default MainStack;
