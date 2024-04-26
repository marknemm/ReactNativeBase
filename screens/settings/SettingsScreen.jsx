import UserCard from '@components/user-card/UserCard';
import { DEVICES_ICON, INFO_ICON, LOGOUT_ICON, THEME_ICON } from '@constants/icons';
import { useUser } from '@hooks/user-hooks';
import { Icon, ListItem } from '@rneui/themed';
import { signOut } from '@util/auth';
import { View } from 'react-native';

/**
 * Settings screen.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The settings screen.
 */
export default function SettingsScreen({ navigation }) {
  const user = useUser();
  return (
    <View>
      <UserCard
        onPress={() => navigation.navigate('Profile')}
        user={user}
      />

      <ListItem onPress={() => navigation.navigate('Theme')} bottomDivider>
        <Icon {...THEME_ICON} color="grey" />
        <ListItem.Content>
          <ListItem.Title>Theme</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigation.navigate('Devices')} bottomDivider>
        <Icon {...DEVICES_ICON} color="grey" />
        <ListItem.Content>
          <ListItem.Title>Devices</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigation.navigate('About')} bottomDivider>
        <Icon {...INFO_ICON} color="grey" />
        <ListItem.Content>
          <ListItem.Title>About</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => signOut()} bottomDivider>
        <Icon {...LOGOUT_ICON} color="grey" />
        <ListItem.Content>
          <ListItem.Title>Sign Out</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}
