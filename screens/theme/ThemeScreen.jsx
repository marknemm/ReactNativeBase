import Appearance from '@components/appearance/Appearance';
import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import { useLSState } from '@hooks/local-storage-hooks';
import { useTheme } from '@rneui/themed';
import { View, useColorScheme } from 'react-native';

/**
 * Theme screen.
 *
 * @param {Object} props The component properties.
 * @param {Types.Navigation.StackNavigation} props.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The theme screen.
 */
export default function ThemeScreen({ navigation }) {
  const autoColorScheme = useColorScheme();
  const [appearance, setPersistAppearance] = useLSState(
    SETTINGS_THEME_APPEARANCE_KEY,
    { defaultValue: 'auto' }
  );
  const { updateTheme } = useTheme();

  return (
    <View>
      <Appearance
        appearance={appearance}
        disabled={!appearance}
        onAppearanceChange={(newAppearance) => {
          setPersistAppearance(newAppearance);
          const newThemeMode = newAppearance === 'auto' ? autoColorScheme : newAppearance;
          updateTheme({ mode: newThemeMode });
        }}
      />
    </View>
  );
}
