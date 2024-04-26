import { Dialog } from '@rneui/themed';
import PropTypes from 'prop-types';

/**
 * The {@link InfoDialog} component.
 *
 * @param {Object} props The component properties.
 * @param {React.ReactNode} props.children The children components that will be placed in the dialog body.
 * @param {boolean} [props.isVisible=false] The visibility of the dialog.
 * @param {() => void} [props.onClose=() => {}] The function to call when the dialog is closed.
 * @param {string} [props.title=''] The title of the dialog.
 * @returns {React.JSX.Element} The {@link InfoDialog} component.
 */
export default function InfoDialog({ children, isVisible = false, onClose = () => {}, title = '' }) {
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      { title && <Dialog.Title>{ title }</Dialog.Title> }
      { children }
      <Dialog.Actions>
        <Dialog.Button onPress={onClose}>Close</Dialog.Button>
      </Dialog.Actions>
    </Dialog>
  );
}

InfoDialog.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
