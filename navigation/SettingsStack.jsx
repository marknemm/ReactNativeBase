import { useScreenOptions } from '@hooks/navigation-hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DevicesScreen from '@screens/devices/DevicesScreen';
import SettingsScreen from '@screens/settings/SettingsScreen';
import ThemeScreen from '@screens/theme/ThemeScreen';

const Stack = createNativeStackNavigator();

/**
 * The stack for the dogs screens.
 *
 * @param {Object} param0 The component properties.
 * @param {import('@typedefs/navigation').Navigation} param0.navigation The navigation object.
 * @returns {React.JSX.Element} The stack for the dogs screens.
 */
export default function SettingsStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={useScreenOptions()}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
      />
      <Stack.Screen
        name="Devices"
        component={DevicesScreen}
      />
    </Stack.Navigator>
  );
}
