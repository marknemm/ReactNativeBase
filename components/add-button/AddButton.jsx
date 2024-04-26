import { ADD_ICON } from '@constants/icons';
import { Button } from '@rneui/themed';
import PropTypes from 'prop-types';

/**
 * The {@link AddButton} component.
 *
 * @param {Object} props The component properties.
 * @param {string} [props.backgroundColor='white'] The background color of the add button.
 * @param {string} [props.color='black'] The color of the add button.
 * @param {boolean} [props.disabled=false] Whether the add button is disabled.
 * @param {(event: import('react-native').GestureResponderEvent) => void} [props.onPress=() => {}] The function to call when the add button is pressed.
 * @param {number} [props.size=24] The size of the add button.
 * @param {Object} [props.style={}] The additional style of the add button.
 * @returns {React.JSX.Element} The {@link AddButton} component.
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
