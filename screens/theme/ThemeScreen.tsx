import Appearance from '@components/appearance/Appearance';
import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import { useLSState } from '@hooks/local-storage-hooks';
import { ScreenProps } from '@interfaces/screen';
import { useTheme } from '@rneui/themed';
import { View, useColorScheme } from 'react-native';

/**
 * The theme screen.
 *
 * @returns The {@link ThemeScreen} component.
 */
const ThemeScreen: React.FC<ScreenProps> = () => {
  const autoColorScheme = useColorScheme();
  const [appearance, setPersistAppearance] = useLSState<'light' | 'dark' | 'auto'>(
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
};

export default ThemeScreen;
