import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import BleManagerProvider from '@contexts/ble-manager/BleManagerProvider';
import { usePersistentState } from '@hooks/storage-hooks';
import MainTabs from '@navigation/MainTabs';
import { ThemeProvider } from '@rneui/themed';
import { genRneTheme } from '@styles/theme';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
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
