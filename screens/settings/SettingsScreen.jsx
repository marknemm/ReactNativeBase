import { Icon, ListItem } from '@rneui/themed';
import { View } from 'react-native';

/**
 * Settings screen.
 *
 * @param {Object} param0 The component properties.
 * @param {import('@typedefs/navigation').Navigation} param0.navigation The navigation object.
 * @returns {React.JSX.Element} The settings screen.
 */
export default function SettingsScreen({ navigation }) {
  return (
    <View>
      <ListItem onPress={() => navigation.navigate('Theme')} bottomDivider>
        <Icon name="palette" type="material" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Theme</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigation.navigate('Devices')} bottomDivider>
        <Icon name="extension" type="material" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Devices</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
}
