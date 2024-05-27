import BleManagerProvider from '@contexts/ble-manager/BleManagerProvider';
import GeneralStylesProvider from '@contexts/general-styles/GeneralStylesProvider';
import UserProvider from '@contexts/user/UserProvider';
import { useThemeGenerator } from '@hooks/theme-hooks';
import { ThemeProvider } from '@rneui/themed';
import { genTheme } from '@styles/theme';
import { defaultUserDoc } from '@util/__mocks__/user';
import User from '@util/user';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type AppProviderProps from './AppProvider.props';

jest.mock('@util/user');
jest.mock('react-native-ble-plx');

/**
 * Provides various app-wide contexts for unit tests.
 *
 * @param props The component {@link AppProviderProps}.
 * @returns The {@link AppProvider} component.
 */
export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  colorScheme,
  initialMetrics,
  userDoc = defaultUserDoc,
  windowDimensions,
}) => {
  const theme = useThemeGenerator((scheme, dimensions) =>
    genTheme(colorScheme ?? scheme, windowDimensions ?? dimensions)
  );
  const user = new User(userDoc);

  return (
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <ThemeProvider theme={theme}>
        <GeneralStylesProvider>
          <BleManagerProvider>
            <UserProvider user={user}>
              {children}
            </UserProvider>
          </BleManagerProvider>
        </GeneralStylesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
