import ScreenView from '@components/screen-view/ScreenView';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { ScreenProps } from '@interfaces/screen';
import { Button, Text } from '@rneui/themed';

/**
 * The home screen of the application.
 *
 * @returns The {@link HomeScreen} component.
 */
const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const generalStyles = useGeneralStyles();

  return (
    <ScreenView>
      <Text center fontLarge muted p>
        Welcome to the Sample app!
      </Text>
      <Text b center fontLarge muted p>
        Get started by creating or joining a group.
      </Text>
      <Button
        onPress={() => navigation.navigate('List Groups')}
        style={generalStyles.form.submitButton}
        title="Join a Group"
      />
      <Button
        onPress={() => navigation.navigate('Create Group')}
        style={generalStyles.form.submitButton}
        title="Create a Group"
      />
    </ScreenView>
  );
};

export default HomeScreen;
