import InfoDialog from '@components/info-dialog/InfoDialog';
import { INFO_ICON } from '@constants/icons';
import { Button, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Props } from './props';

/**
 * A standard info icon button.
 *
 * Can also display an {@link InfoDialog} on press.
 */
const InfoButton: React.FC<Props> = ({
  color = 'transparent',
  iconColor,
  iconSize = 24,
  children,
  dialogTitle,
  onPress,
  ...buttonProps
}) => {
  const { theme } = useTheme();
  const [infoDialogVisible, setInfoDialogVisible] = useState(false);

  const infoDialog = children && (
    <InfoDialog
      isVisible={infoDialogVisible}
      onClose={() => setInfoDialogVisible(false)}
      title={dialogTitle}
    >
      { children }
    </InfoDialog>
  );

  return (
    <>
      <Button
        color={color}
        icon={{
          ...INFO_ICON,
          color: iconColor ?? theme.colors.black,
          size: iconSize,
        }}
        onPress={(event) => {
          if (infoDialog) {
            setInfoDialogVisible(true);
          }
          onPress?.(event);
        }}
        {...buttonProps}
      />

      { infoDialog }
    </>
  );
}

export default InfoButton;
