import BleDeviceList from '@components/ble-device-list/BleDeviceList';
import BleManagerProvider from '@contexts/ble-manager/BleManagerProvider';
import { ThemeProvider } from '@rneui/themed';
import { genTheme } from '@styles/theme';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// const styles = StyleSheet.create({
//   correctionLevelBody: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });

/**
 * The main application component.
 *
 * @returns {React.JSX.Element} The main application component.
 */
export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => genTheme(colorScheme), [colorScheme]);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar />

        <SafeAreaView>

          {/* <Card>
            <Card.Title>Correction Level</Card.Title>
            <Card.Divider />
            <View style={styles.correctionLevelBody}>
              <Button title="Low" onPress={() => alert('Button Clicked')} />
              <Button title="Medium" onPress={() => alert('Button Clicked')} />
              <Button title="High" onPress={() => alert('Button Clicked')} />
            </View>
          </Card> */}

          <BleManagerProvider>
            <BleDeviceList />
            {/* <BleDeviceProvider deviceMatchCb={(device) => device.name === 'One Collar'}>
              <BleDevice />
            </BleDeviceProvider> */}
          </BleManagerProvider>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
