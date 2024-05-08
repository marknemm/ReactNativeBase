import ScreenView from '@components/screen-view/ScreenView';
import UserCard from '@components/user-card/UserCard';
import { DEVICES_ICON, INFO_ICON, LOGOUT_ICON, THEME_ICON } from '@constants/icons';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { useUser } from '@hooks/user-hooks';
import { ScreenProps } from '@interfaces/screen';
import { Icon, ListItem } from '@rneui/themed';
import { signOut } from '@util/auth';

/**
 * The settings screen of the application.
 */
const SettingsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const generalStyles = useGeneralStyles();
  const user = useUser();

  return (
    <ScreenView style={generalStyles.view.noPaddingHorizontal}>
      <UserCard
        containerStyle={generalStyles.view.noMarginTop}
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
    </ScreenView>
  );
}

export default SettingsScreen;
