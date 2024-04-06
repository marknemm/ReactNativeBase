import Appearance from '@components/appearance/Appearance';
import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import { usePersistentState } from '@hooks/storage-hooks';
import { useTheme } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { View, useColorScheme } from 'react-native';

/**
 * Theme screen.
 *
 * @param {Object} param0 The component properties.
 * @param {import('@typedefs/navigation').Navigation} param0.navigation The navigation object.
 * @returns {React.JSX.Element} The theme screen.
 */
export default function ThemeScreen({ navigation }) {
  const autoColorScheme = useColorScheme();
  const [appearance, setPersistAppearance] = usePersistentState(
    SETTINGS_THEME_APPEARANCE_KEY,
    { defaultValue: 'auto', persistOnSetState: true }
  );
  const { updateTheme } = useTheme();

  return (
    <View style={generalStyles.gutter}>
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
