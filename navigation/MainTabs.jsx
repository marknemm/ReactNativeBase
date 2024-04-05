import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon, useTheme } from '@rneui/themed';
import { genNavTheme } from '@styles/theme';
import { useMemo } from 'react';
import DogsStack from './DogsStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

/**
 * The main (bottom) tabs navigation.
 *
 * @returns {React.JSX.Element} The main (bottom) tabs navigation.
 */
export default function MainTabs() {
  const { theme } = useTheme();
  const navTheme = useMemo(() => genNavTheme(theme), [theme]);

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Dogs Stack"
          component={DogsStack}
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
    </NavigationContainer>
  );
}
