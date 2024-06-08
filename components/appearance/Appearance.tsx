import ScreenView from '@components/screen-view/ScreenView';
import { useGeneralStyles } from '@hooks/styles-hooks';
import { CheckBox, Text } from '@rneui/themed';
import { View } from 'react-native';
import type { AppearanceProps } from './Appearance.interfaces';

/**
 * Component that allows the user to select the appearance of the application.
 *
 * @param props The {@link AppearanceProps}.
 * @returns The {@link Appearance} component.
 */
const Appearance: React.FC<AppearanceProps> = ({
  appearance,
  disabled,
  onAppearanceChange,
}) => {
  const generalStyles = useGeneralStyles();

  return (
    <ScreenView>
      <Text style={generalStyles.form.label}>
        Appearance
      </Text>
      <View style={generalStyles.view.row}>
        <CheckBox
          title="Auto"
          checked={appearance === 'auto'}
          checkedIcon="circle-half-full"
          uncheckedIcon="circle-half-full"
          iconType="material-community"
          textStyle={appearance === 'auto' ? generalStyles.text.doubleUnderline : undefined}
          onPress={() => onAppearanceChange?.('auto')}
          disabled={disabled}
        />
        <CheckBox
          title="Light"
          checked={appearance === 'light'}
          checkedIcon="sun-o"
          uncheckedIcon="sun-o"
          textStyle={appearance === 'light' ? generalStyles.text.doubleUnderline : undefined}
          onPress={() => onAppearanceChange?.('light')}
          disabled={disabled}
        />
        <CheckBox
          title="Dark"
          checked={appearance === 'dark'}
          checkedIcon="moon-o"
          uncheckedIcon="moon-o"
          textStyle={appearance === 'dark' ? generalStyles.text.doubleUnderline : undefined}
          onPress={() => onAppearanceChange?.('dark')}
          disabled={disabled}
        />
      </View>
    </ScreenView>
  );
};

export default Appearance;
export type * from './Appearance.interfaces';
