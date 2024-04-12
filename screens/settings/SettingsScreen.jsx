import UserCard from '@components/user-card/UserCard';
import { useUser } from '@hooks/user-hooks';
import { Icon, ListItem } from '@rneui/themed';
import { logout } from '@util/auth';
import { View } from 'react-native';

/**
 * Settings screen.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The settings screen.
 */
export default function SettingsScreen({ navigation }) {
  const user = useUser();
  return (
    <View>
      <UserCard user={user} />

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
      <ListItem onPress={() => navigation.navigate('About')} bottomDivider>
        <Icon name="info" type="material" color="grey" />
        <ListItem.Content>
          <ListItem.Title>About</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => logout()} bottomDivider>
        <Icon name="logout" type="material" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Logout</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}
