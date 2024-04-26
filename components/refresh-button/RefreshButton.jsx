import { REFRESH_ICON } from '@constants/icons';
import { Button, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';

/**
 * The {@link RefreshButton} component.
 *
 * @param {Object} props The component properties.
 * @param {string} [props.backgroundColor='transparent'] The background color of the refresh button.
 * @param {string} [props.color='black'] The color of the refresh button.
 * @param {(event: import('react-native').GestureResponderEvent) => void} [props.onPress=() => {}] The function to call when the refresh button is pressed.
 * @param {number} [props.size=24] The size of the refresh button.
 * @param {Object} [props.style={}] The additional style of the refresh button.
 * @returns {React.JSX.Element} The {@link RefreshButton} component.
 */
export default function RefreshButton({
  backgroundColor = 'transparent',
  color,
  onPress = () => {},
  size = 24,
  style = {},
}) {
  const { theme } = useTheme();

  return (
    <Button
      icon={{
        ...REFRESH_ICON,
        color: color ?? theme.colors.black,
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
