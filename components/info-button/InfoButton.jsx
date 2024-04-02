import { Button } from '@rneui/themed';
import PropTypes from 'prop-types';

/**
 * The info button component.
 *
 * @param {Object} param0 The component properties.
 * @param {string} [param0.backgroundColor='white'] The background color of the info button.
 * @param {string} [param0.color='black'] The color of the info button.
 * @param {(event: import('react-native').GestureResponderEvent) => void} [param0.onPress=() => {}] The function to call when the info button is pressed.
 * @param {number} [param0.size=24] The size of the info button.
 * @param {Object} [param0.style={}] The additional style of the info button.
 * @returns {React.JSX.Element} The info button component.
 */
export default function InfoButton({
  backgroundColor = 'white',
  color = 'black',
  onPress = () => {},
  size = 24,
  style = {}
}) {
  return (
    <Button
      icon={{
        name: 'info',
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

InfoButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.number,
};
