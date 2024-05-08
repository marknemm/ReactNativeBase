import { REFRESH_ICON } from '@constants/icons';
import { FixedIconButtonProps } from '@interfaces/button';
import { Button, useTheme } from '@rneui/themed';

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
const RefreshButton: React.FC<FixedIconButtonProps> = ({
  color = 'transparent',
  iconColor,
  iconSize = 24,
  ...buttonProps
}) => {
  const { theme } = useTheme();

  return (
    <Button
      color={color}
      icon={{
        ...REFRESH_ICON,
        color: iconColor ?? theme.colors.black,
        size: iconSize,
      }}
      {...buttonProps}
    />
  );
}

export default RefreshButton;
