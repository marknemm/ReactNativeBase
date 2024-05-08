import ScreenView from '@components/screen-view/ScreenView';
import { ScreenProps } from '@interfaces/screen';
import { Text } from '@rneui/themed';

/**
 * The home screen of the application.
 */
const HomeScreen: React.FC<ScreenProps> = () => {
  return (
    <ScreenView>
      <Text>My Pets</Text>
    </ScreenView>
  );
}

export default HomeScreen;
