import SignInModal from '@components/sign-in-modal/SignInModal';
import BleManagerProvider from '@contexts/ble-manager/BleManagerProvider';
import GeneralStylesProvider from '@contexts/general-styles/GeneralStylesProvider';
import UserProvider from '@contexts/user/UserProvider';
import { useAuthState } from '@hooks/auth-hooks';
import { useThemeGenerator } from '@hooks/theme-hooks';
import NavigationRoot from '@navigation/NavigationRoot';
import { ThemeProvider } from '@rneui/themed';
import { genTheme } from '@styles/theme';
import { initAuth } from '@util/auth';
import { initFirebaseEnv } from '@util/firebase';
import { initKeyboardConfig } from '@util/keyboard';
import '@util/why-did-you-render';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Initial global configuration that is separate from App component rendering and hooks.
SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding until App component is rendered.
initFirebaseEnv();                   // Initialize Firebase environment - mods backend host to simulator for local dev env.
initKeyboardConfig();                // Initialize app-wide keyboard features.
initAuth({ SignInModal });           // Initialize authentication.

/**
 * The main application component.
 *
 * @returns The {@link App} component.
 */
const App: React.FC = () => {
  const theme = useThemeGenerator(genTheme);
  const { user, userLoading } = useAuthState();
  const [appInitialized, setAppInitialized] = useState(!userLoading);

  if (!appInitialized) { // Only set app initialized and show app after user authentication data is first loaded.
    if (!userLoading) setAppInitialized(true);
    return null;
  }

  return (
    <SafeAreaProvider onLayout={SplashScreen.hideAsync}>
      <ThemeProvider theme={theme}>
        <GeneralStylesProvider>
          <BleManagerProvider>
            <UserProvider user={user}>
              <StatusBar />
              <RootSiblingParent>
                <NavigationRoot />
              </RootSiblingParent>
            </UserProvider>
          </BleManagerProvider>
        </GeneralStylesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
