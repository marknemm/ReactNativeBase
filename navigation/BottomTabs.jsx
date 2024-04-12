import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import MainStack from './MainStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

/**
 * The {@link BottomTabs} navigation.
 *
 * @returns {React.JSX.Element} The {@link BottomTabs} navigation.
 */
export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Main Stack"
        component={MainStack}
        options={{
          tabBarLabel: 'Dogs',
          tabBarIcon: ({ color, size }) => <Icon name="pets" type="material" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings Stack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => <Icon name="settings" type="material" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
