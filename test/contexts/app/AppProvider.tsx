import GeneralStylesProvider from '@contexts/general-styles/GeneralStylesProvider';
import { useThemeGenerator } from '@hooks/theme-hooks';
import { ThemeProvider } from '@rneui/themed';
import { genTheme } from '@styles/theme';
import BleManagerProvider from '@test/contexts/ble-manager/BleManagerProvider';
import UserProvider from '@test/contexts/user/UserProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { AppProviderProps } from './AppProvider.interface';

/**
 * Provides various app-wide contexts for unit tests.
 *
 * @param props The component {@link AppProviderProps}.
 * @returns The {@link AppProvider} component.
 */
const AppProvider: React.FC<AppProviderProps> = ({
  children,
  colorScheme,
  initialMetrics,
  windowDimensions,
}) => {
  const theme = useThemeGenerator((scheme, dimensions) =>
    genTheme(colorScheme ?? scheme, windowDimensions ?? dimensions)
  );

  return (
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <ThemeProvider theme={theme}>
        <GeneralStylesProvider>
          <BleManagerProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </BleManagerProvider>
        </GeneralStylesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export type * from './AppProvider.interface';
export default AppProvider;
