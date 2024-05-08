import { REFRESH_ICON } from '@constants/icons';
import { FixedIconButtonProps } from '@interfaces/button';
import { Button, useTheme } from '@rneui/themed';

/**
 * The {@link RefreshButton} component.
 *
 * @param props The component {@link FixedIconButtonProps}.
 * @returns The {@link RefreshButton} component.
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
};

export default RefreshButton;
