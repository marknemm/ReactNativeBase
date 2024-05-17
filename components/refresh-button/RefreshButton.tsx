import { REFRESH_ICON } from '@constants/icons';
import { FixedIconButtonProps } from '@interfaces/button';
import { Button, useTheme } from '@rneui/themed';
import { forwardRef } from 'react';

/**
 * The {@link RefreshButton} component.
 *
 * @param props The component {@link FixedIconButtonProps}.
 * @param ref The component reference.
 * @returns The {@link RefreshButton} component.
 */
const RefreshButton: React.FC<FixedIconButtonProps> = forwardRef(({
  color = 'transparent',
  iconColor,
  iconSize = 24,
  ...buttonProps
}, ref) => {
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
      ref={ref}
    />
  );
});

export default RefreshButton;
