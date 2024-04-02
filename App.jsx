import BleDeviceList from '@components/ble-device-list/BleDeviceList';
import BleManagerProvider from '@contexts/ble-manager/BleManagerProvider';
import { StatusBar } from 'expo-status-bar';
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
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
