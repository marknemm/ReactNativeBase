import BleDevice from '@components/ble-device/BleDevice';
import BleState from '@components/ble-state/BleState';
import BleDeviceProvider from '@contexts/ble-device/BleDeviceProvider';
import BleManagerProvider from '@contexts/ble-manager/BleManagerProvider';
import { Card } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  correctionLevelBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  }
});

/**
 * The main application component.
 *
 * @returns {React.JSX.Element} The main application component.
 */
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar />

      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Correction Level</Card.Title>
          <Card.Divider />
          <View style={styles.correctionLevelBody}>
            <Button title="Low" onPress={() => alert('Button Clicked')} />
            <Button title="Medium" onPress={() => alert('Button Clicked')} />
            <Button title="High" onPress={() => alert('Button Clicked')} />
          </View>
        </Card>

        <BleManagerProvider>
          <BleState />
          <BleDeviceProvider deviceMatchCb={(device) => device.name.startsWith('Mark')}>
            <BleDevice />
          </BleDeviceProvider>
        </BleManagerProvider>
      </ScrollView>
    </SafeAreaProvider>
  );
}
