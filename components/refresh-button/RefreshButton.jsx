import { Button } from '@rneui/themed';
import PropTypes from 'prop-types';

/**
 * The refresh button component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} [param0.backgroundColor='white'] The background color of the refresh button.
 * @param {string} [param0.color='black'] The color of the refresh button.
 * @param {(event: import('react-native').GestureResponderEvent) => void} [param0.onPress=() => {}] The function to call when the refresh button is pressed.
 * @param {number} [param0.size=24] The size of the refresh button.
 * @param {Object} [param0.style={}] The additional style of the refresh button.
 * @returns {React.JSX.Element} The refresh button component.
 */
export default function RefreshButton({
  backgroundColor = 'white',
  color = 'black',
  onPress = () => {},
  size = 24,
  style = {}
}) {
  return (
    <Button
      icon={{
        name: 'refresh',
        type: 'material',
        color,
        size,
      }}
      color={backgroundColor}
      onPress={onPress}
      style={style}
    />
  );
}

RefreshButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.number,
};
