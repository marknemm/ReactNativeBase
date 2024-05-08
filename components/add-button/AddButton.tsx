import { ADD_ICON } from '@constants/icons';
import { FixedIconButtonProps } from '@interfaces/button';
import { Button } from '@rneui/themed';

/**
 * A button that adds an item.
 *
 * @param props The component {@link Props}.
 * @returns The {@link AddButton} component.
 */
const AddButton: React.FC<FixedIconButtonProps> = ({
  color = 'transparent',
  iconColor,
  iconSize = 24,
  ...buttonProps
}) => (
  <Button
    color={color}
    icon={{
      ...ADD_ICON,
      color: iconColor,
      size: iconSize,
    }}
    radius={iconSize}
    {...buttonProps}
  />
);

export default AddButton;
