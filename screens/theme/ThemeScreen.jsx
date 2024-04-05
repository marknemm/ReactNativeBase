import { SETTINGS_THEME_APPEARANCE_KEY } from '@constants/storage-keys';
import { usePersistentState } from '@hooks/storage-hooks';
import { CheckBox, Text, useTheme } from '@rneui/themed';
import { generalStyles } from '@styles/general';
import { screenStyles } from '@styles/screens';
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
    <View style={screenStyles.container}>
      <Text>Appearance</Text>
      <View style={generalStyles.row}>
        <CheckBox
          title="Auto"
          checked={appearance === 'auto'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={() => {
            setPersistAppearance('auto');
            updateTheme({ mode: autoColorScheme });
          }}
        />
        <CheckBox
          title="Light"
          checked={appearance === 'light'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={() => {
            setPersistAppearance('light');
            updateTheme({ mode: 'light' });
          }}
        />
        <CheckBox
          title="Dark"
          checked={appearance === 'dark'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={() => {
            setPersistAppearance('dark');
            updateTheme({ mode: 'dark' });
          }}
        />
      </View>
    </View>
  );
}
