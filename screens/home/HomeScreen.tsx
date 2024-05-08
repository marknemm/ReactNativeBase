import ScreenView from '@components/screen-view/ScreenView';
import { ScreenProps } from '@interfaces/screen';
import { Text } from '@rneui/themed';

/**
 * The home screen of the application.
 *
 * @returns The {@link HomeScreen} component.
 */
const HomeScreen: React.FC<ScreenProps> = () => (
  <ScreenView>
    <Text>My Pets</Text>
  </ScreenView>
);

export default HomeScreen;
