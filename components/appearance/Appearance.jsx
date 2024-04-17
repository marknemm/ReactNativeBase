import { CheckBox, Text } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import PropTypes from 'prop-types';
import { View } from 'react-native';

/**
 * The {@link Appearance} component.
 *
 * @param {Object} param0 The component properties.
 * @param {'auto' | 'dark' | 'light'} param0.appearance The appearance.
 * @param {boolean} [param0.disabled=false] Whether the component is disabled.
 * @param {(appearance: 'auto' | 'dark' | 'light') => void} [param0.onAppearanceChange] The function to call when the appearance changes.
 * @returns {React.JSX.Element} The {@link Appearance} component.
 */
export default function Appearance({ appearance, disabled = false, onAppearanceChange = () => {} }) {
  return (
    <View>
      <Text>Appearance</Text>
      <View style={generalStyles.row}>
        <CheckBox
          title="Auto"
          checked={appearance === 'auto'}
          checkedIcon="circle-half-full"
          uncheckedIcon="circle-half-full"
          iconType="material-community"
          textStyle={appearance === 'auto' ? generalStyles.doubleUnderline : {}}
          onPress={() => onAppearanceChange('auto')}
          disabled={disabled}
        />
        <CheckBox
          title="Light"
          checked={appearance === 'light'}
          checkedIcon="sun-o"
          uncheckedIcon="sun-o"
          textStyle={appearance === 'light' ? generalStyles.doubleUnderline : {}}
          onPress={() => onAppearanceChange('light')}
          disabled={disabled}
        />
        <CheckBox
          title="Dark"
          checked={appearance === 'dark'}
          checkedIcon="moon-o"
          uncheckedIcon="moon-o"
          textStyle={appearance === 'dark' ? generalStyles.doubleUnderline : {}}
          onPress={() => onAppearanceChange('dark')}
          disabled={disabled}
        />
      </View>
    </View>
  );
}

Appearance.propTypes = {
  appearance: PropTypes.oneOf(['auto', 'dark', 'light']),
  disabled: PropTypes.bool,
  onAppearanceChange: PropTypes.func,
};
