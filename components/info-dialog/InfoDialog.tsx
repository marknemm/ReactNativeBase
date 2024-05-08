import { Dialog } from '@rneui/themed';
import { Props } from './props';

/**
 * A common dialog that displays information.
 *
 * Contains a title and a close button.
 *
 * @param props The component {@link Props}.
 * @returns The {@link InfoDialog} component.
 */
const InfoDialog: React.FC<Props> = ({ children, isVisible = false, onClose, title = '', ...dialogProps }) => (
  <Dialog
    isVisible={isVisible}
    onBackdropPress={onClose}
    {...dialogProps}
  >
    { title && <Dialog.Title>{ title }</Dialog.Title> }
    { children }
    <Dialog.Actions>
      <Dialog.Button onPress={onClose}>Close</Dialog.Button>
    </Dialog.Actions>
  </Dialog>
);

export default InfoDialog;
