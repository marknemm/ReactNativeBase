import ScreenView from '@components/screen-view/ScreenView';
import { useGeneralStyles } from '@hooks/theme-hooks';
import { CheckBox, Text } from '@rneui/themed';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useStyles } from './styles';

/**
 * The {@link Appearance} component.
 *
 * @param {Object} props The component properties.
 * @param {'auto' | 'dark' | 'light'} props.appearance The appearance.
 * @param {boolean} [props.disabled=false] Whether the component is disabled.
 * @param {(appearance: 'auto' | 'dark' | 'light') => void} [props.onAppearanceChange] The function to call when the appearance changes.
 * @returns {React.JSX.Element} The {@link Appearance} component.
 */
export default function Appearance({ appearance, disabled = false, onAppearanceChange = () => {} }) {
  const styles = useStyles();
  const generalStyles = useGeneralStyles();

  return (
    <ScreenView safeArea scrollable>
      <Text style={styles.label}>
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
          onPress={() => onAppearanceChange('auto')}
          disabled={disabled}
        />
        <CheckBox
          title="Light"
          checked={appearance === 'light'}
          checkedIcon="sun-o"
          uncheckedIcon="sun-o"
          textStyle={appearance === 'light' ? generalStyles.text.doubleUnderline : undefined}
          onPress={() => onAppearanceChange('light')}
          disabled={disabled}
        />
        <CheckBox
          title="Dark"
          checked={appearance === 'dark'}
          checkedIcon="moon-o"
          uncheckedIcon="moon-o"
          textStyle={appearance === 'dark' ? generalStyles.text.doubleUnderline : undefined}
          onPress={() => onAppearanceChange('dark')}
          disabled={disabled}
        />
      </View>
    </ScreenView>
  );
}

Appearance.propTypes = {
  appearance: PropTypes.oneOf(['auto', 'dark', 'light']),
  disabled: PropTypes.bool,
  onAppearanceChange: PropTypes.func,
};
