import { Dialog } from '@rneui/themed';
import type { InfoDialogProps } from './InfoDialog.interfaces';

/**
 * A common dialog that displays information.
 *
 * Contains a title and a close button.
 *
 * @param props The component {@link InfoDialogProps}.
 * @returns The {@link InfoDialog} component.
 */
const InfoDialog: React.FC<InfoDialogProps> = ({
  children,
  isVisible = false,
  onClose,
  title,
  ...dialogProps
}) => (
  <Dialog
    isVisible={isVisible}
    onBackdropPress={onClose}
    {...dialogProps}
  >
    {title && <Dialog.Title title={title} />}
    {children}
    <Dialog.Actions>
      <Dialog.Button onPress={onClose}>Close</Dialog.Button>
    </Dialog.Actions>
  </Dialog>
);

export type * from './InfoDialog.interfaces';
export default InfoDialog;
