import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import BleManagerProvider from '@contexts/ble-manager/BleManagerProvider';
import { usePersistentState } from '@hooks/storage-hooks';
import MainTabs from '@navigation/MainTabs';
import { firebase } from '@react-native-firebase/auth';
import { ThemeProvider } from '@rneui/themed';
import { genRneTheme } from '@styles/theme';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * The main application component.
 *
 * @returns {React.JSX.Element} The main application component.
 */
export default function App() {
  KeyboardManager.setEnable(true);
  const [colorScheme] = usePersistentState(SETTINGS_THEME_APPEARANCE_KEY, { defaultValue: useColorScheme() });
  const rneTheme = useMemo(() => genRneTheme(colorScheme), [colorScheme]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((usr) => {
      console.log(usr);
      setUser(usr);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={rneTheme}>
        <BleManagerProvider>
          <StatusBar />
          <MainTabs />
        </BleManagerProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
