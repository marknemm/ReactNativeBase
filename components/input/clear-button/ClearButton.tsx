import { CLEAR_ICON } from '@constants/icons';
import { useColors } from '@hooks/theme-hooks';
import { Button } from '@rneui/themed';
import { forwardRef } from 'react';
import { Props } from './props';

/**
 * A button that clears a text `Input` field.
 */
const ClearButton: React.FC<Props> = forwardRef(({
  inputRef,
  isVisible,
  onPress,
  ...buttonProps
}, ref) => {
  const colors = useColors();

  return isVisible && (
    <Button
      icon={{
        ...CLEAR_ICON,
        color: colors.placeholder,
        size: 18,
      }}
      onPress={(event) => {
        onPress?.(event);
        if (!event.defaultPrevented) {
          inputRef.current?.clear();
          inputRef.current?.props.onChangeText?.('');
        }
      }}
      size="sm"
      type="clear"
      {...buttonProps}
      ref={ref}
    />
  );
});

export default ClearButton;
