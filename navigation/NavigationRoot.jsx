import { RootNavigationContainerRefContext } from '@contexts/root-navigation-container-ref/RootNavigationContainerRefContext';
import { useScreenOptions } from '@hooks/navigation-hooks';
import { useUser } from '@hooks/user-hooks';
import { DarkTheme, DefaultTheme, NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import CameraScreen from '@screens/camera/CameraScreen';
import ForgotPasswordScreen from '@screens/forgot-password/ForgotPasswordScreen';
import SignInScreen from '@screens/sign-in/SignInScreen';
import SignUpScreen from '@screens/sign-up/SignUpScreen';
import { useMemo } from 'react';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();
const noHeaderOpts = { headerShown: false };

/**
 * The {@link NavigationRoot}.
 *
 * @returns {React.JSX.Element} The {@link NavigationRoot}.
 */
export default function NavigationRoot() {
  const user = useUser();
  const navigationRef = createNavigationContainerRef();

  return (
    <NavigationContainer theme={useNavTheme()} ref={navigationRef}>
      <RootNavigationContainerRefContext.Provider value={navigationRef}>
        <Stack.Navigator screenOptions={useScreenOptions()}>
          { user?.isAuthenticated ? (
            <>
              <Stack.Screen
                name="Bottom Tabs"
                component={BottomTabs}
                options={noHeaderOpts}
              />
              <Stack.Screen
                name="Camera"
                component={CameraScreen}
                options={noHeaderOpts}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Sign In"
                component={SignInScreen}
              />
              <Stack.Screen
                name="Sign Up"
                component={SignUpScreen}
              />
              <Stack.Screen
                name="Forgot Password"
                component={ForgotPasswordScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </RootNavigationContainerRefContext.Provider>
    </NavigationContainer>
  );
}

/**
 * Uses the navigation theme.
 *
 * @returns {import('@react-navigation/native').Theme} The navigation theme.
 */
function useNavTheme() {
  const { theme } = useTheme();

  return useMemo(() => {
    const dark = theme.mode === 'dark';
    const navDefaultTheme = dark ? DarkTheme : DefaultTheme;

    return {
      dark,
      colors: {
        ...navDefaultTheme.colors,
        ...theme.colors,
        text: theme.colors.black,
      },
    };
  }, [theme]);
}
