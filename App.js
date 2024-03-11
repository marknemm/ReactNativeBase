import { Card } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Card>
        <Card.Title>Correction Level</Card.Title>
        <Card.Divider/>
        <View style={styles.correctionLevelBody}>
          <Button title="Low" onPress={() => alert('Button Clicked')} />
          <Button title="Medium" onPress={() => alert('Button Clicked')} />
          <Button title="High" onPress={() => alert('Button Clicked')} />
        </View>
      </Card>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctionLevelBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    Button: {
      marginEnd: 10,
    },
  },
});
