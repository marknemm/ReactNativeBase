import InfoDialog from '@components/info-dialog/InfoDialog';
import { INFO_ICON } from '@constants/icons';
import { Button, useTheme } from '@rneui/themed';
import { forwardRef, useState } from 'react';
import type { InfoButtonProps } from './InfoButton.interfaces';

/**
 * A standard info icon button.
 *
 * Can also display an {@link InfoDialog} on press.
 *
 * @param props The component {@link InfoButtonProps}.
 * @param ref The component reference.
 * @returns The {@link InfoButton} component.
 */
const InfoButton: React.FC<InfoButtonProps> = forwardRef(({
  color = 'transparent',
  iconColor,
  iconSize = 24,
  children,
  dialogTitle,
  onPress,
  ...buttonProps
}, ref) => {
  const { theme } = useTheme();
  const [infoDialogVisible, setInfoDialogVisible] = useState(false);

  return (
    <>
      <Button
        accessibilityLabel="Info"
        color={color}
        icon={{
          ...INFO_ICON,
          color: iconColor ?? theme.colors.black,
          size: iconSize,
        }}
        onPress={(event) => {
          if (children) {
            setInfoDialogVisible(true);
          }
          onPress?.(event);
        }}
        {...buttonProps}
        ref={ref}
      />

      {children && (
        <InfoDialog
          isVisible={infoDialogVisible}
          onClose={() => setInfoDialogVisible(false)}
          title={dialogTitle}
        >
          { children }
        </InfoDialog>
      )}
    </>
  );
});

export type * from './InfoButton.interfaces';
export default InfoButton;
