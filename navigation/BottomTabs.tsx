import { PETS_ICON, SETTINGS_ICON } from '@constants/icons';
import { ScreenProps } from '@interfaces/screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import MainStack from './MainStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

/**
 * The bottom tabs navigation for the application.
 *
 * @returns The {@link BottomTabs} component.
 */
const BottomTabs: React.FC<ScreenProps> = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Main Stack"
      component={MainStack}
      options={{
        tabBarLabel: 'Dogs',
        tabBarIcon: ({ color, size }) => <Icon {...PETS_ICON} color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Settings Stack"
      component={SettingsStack}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => <Icon {...SETTINGS_ICON} color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabs;
