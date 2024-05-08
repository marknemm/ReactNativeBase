import { ADD_ICON } from '@constants/icons';
import { FixedIconButtonProps } from '@interfaces/button';
import { Button } from '@rneui/themed';

/**
 * A button that adds an item.
 */
const AddButton: React.FC<FixedIconButtonProps> = ({
  color = 'transparent',
  iconColor,
  iconSize = 24,
  ...buttonProps
}) => {
  return (
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
}

export default AddButton;
