import type Input from '@components/input/Input';
import { CLEAR_ICON } from '@constants/icons';
import { useColors } from '@hooks/theme-hooks';
import { Button } from '@rneui/themed';
import { forwardRef } from 'react';
import type { ClearButtonProps } from './ClearButton.interfaces';

/**
 * A button that clears a text {@link Input} field.
 */
const ClearButton: React.FC<ClearButtonProps> = forwardRef(({
  inputRef,
  isVisible,
  onPress,
  ...buttonProps
}, ref) => {
  const colors = useColors();

  return isVisible && (
    <Button
      accessibilityLabel="Clear"
      icon={{
        ...CLEAR_ICON,
        color: colors.placeholder,
        size: 18,
      }}
      onPress={(event) => {
        onPress?.(event);
        if (!event?.isDefaultPrevented() && !event?.defaultPrevented) {
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

export type * from './ClearButton.interfaces';
export default ClearButton;
