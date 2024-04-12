import { useScreenOptions } from '@hooks/navigation-hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '@screens/about/About';
import DevicesScreen from '@screens/devices/DevicesScreen';
import SettingsScreen from '@screens/settings/SettingsScreen';
import ThemeScreen from '@screens/theme/ThemeScreen';
import UserProfileScreen from '@screens/user-profile/UserProfileScreen';

const Stack = createNativeStackNavigator();

/**
 * The {@link SettingsStack} navigation.
 *
 * @returns {React.JSX.Element} The {@link SettingsStack} navigation.
 */
export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={useScreenOptions()}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Profile"
        component={UserProfileScreen}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
      />
      <Stack.Screen
        name="Devices"
        component={DevicesScreen}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
      />
    </Stack.Navigator>
  );
}
