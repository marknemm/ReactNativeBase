import { ADD_ICON } from '@constants/icons';
import { Button } from '@rneui/themed';
import PropTypes from 'prop-types';

/**
 * The add button component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} [param0.backgroundColor='white'] The background color of the add button.
 * @param {string} [param0.color='black'] The color of the add button.
 * @param {boolean} [param0.disabled=false] Whether the add button is disabled.
 * @param {(event: import('react-native').GestureResponderEvent) => void} [param0.onPress=() => {}] The function to call when the add button is pressed.
 * @param {number} [param0.size=24] The size of the add button.
 * @param {Object} [param0.style={}] The additional style of the add button.
 * @returns {React.JSX.Element} The add button component.
 */
export default function AddButton({
  backgroundColor = 'green',
  color = 'white',
  disabled = false,
  onPress = () => {},
  size = 24,
  style = {},
}) {
  return (
    <Button
      buttonStyle={style}
      color={backgroundColor}
      disabled={disabled}
      icon={{
        ...ADD_ICON,
        color,
        size,
      }}
      onPress={onPress}
      radius={size}
    />
  );
}

AddButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  size: PropTypes.number,
};
