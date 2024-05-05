import ScreenView from '@components/screen-view/ScreenView';
import { BULLET_POINT_ICON } from '@constants/icons';
import { Divider, Icon, ListItem, Text } from '@rneui/themed';
import { useStyles } from './styles';

/**
 * About Screen.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The about screen.
 */
export default function AboutScreen({ navigation }) {
  const styles = useStyles();

  return (
    <ScreenView safeArea scrollable style={styles.screenView}>

      <Text h1>
        React Native Base
      </Text>
      <Divider spacingStart="xs" />

      <Text p>
        A base project meant to be cloned and added onto when developing new React Native (Expo) apps.
      </Text>

      <Text p>
        Provides a strong foundation for new apps with the following functionality:
      </Text>

      <ListItem>
        <Icon {...BULLET_POINT_ICON} />
      </ListItem>

    </ScreenView>
  );
}
