import { ADD_ICON } from '@constants/icons';
import { FixedIconButtonProps } from '@interfaces/button';
import { Button } from '@rneui/themed';
import { forwardRef } from 'react';

/**
 * A button that adds an item.
 *
 * @param props The {@link FixedIconButtonProps}.
 * @returns The {@link AddButton} component.
 */
const AddButton: React.FC<FixedIconButtonProps> = forwardRef(({
  color = 'transparent',
  iconColor,
  iconSize = 24,
  ...buttonProps
}, ref) => (
  <Button
    accessibilityLabel="Add"
    color={color}
    icon={{
      ...ADD_ICON,
      color: iconColor,
      size: iconSize,
    }}
    radius={iconSize}
    ref={ref}
    {...buttonProps}
  />
));

export default AddButton;
export type { FixedIconButtonProps } from '@interfaces/button';
