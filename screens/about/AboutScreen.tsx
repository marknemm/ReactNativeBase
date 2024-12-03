import ScreenView from '@components/screen-view/ScreenView';
import { BULLET_POINT_ICON } from '@constants/icons';
import { ScreenProps } from '@interfaces/screen';
import { Divider, Icon, ListItem, Text } from '@rneui/themed';

/**
 * Screen for displaying descriptive information about the app.
 *
 * @returns The {@link AboutScreen} component.
 */
const AboutScreen: React.FC<ScreenProps> = () => (
  <ScreenView>

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

export default AboutScreen;
