import { createElement } from 'react';
import RootSiblingsManager from 'react-native-root-siblings';

/**
 * Shows a `Modal` component.
 *
 * @template R The modal close result type.
 * @template {Types.Modal.ModalProps<R>} P The properties type.
 * @param {((onClose: (result?: R) => void) => React.ReactNode) | React.FunctionComponent<P>} renderModal The render function for the modal.
 * @param {P} [props] The properties to pass to the modal {@link React.FunctionComponent Component}.
 * @returns {() => void} The function to close the modal.
 */
export function showModal(renderModal, props) {
  /** @type {RootSiblingsManager} */
  let rootNode;
  const onClose = (result) => {
    rootNode?.destroy();
    rootNode = null;
    props?.onClose?.(result);
  };

  if (renderModal.name.charAt(0) === renderModal.name.charAt(0).toUpperCase()) {
    // @ts-ignore
    const ModalElement = createElement(renderModal, {
      ...props,
      onClose,
    });
    renderModal = () => ModalElement;
  }

  // @ts-ignore
  rootNode = new RootSiblingsManager(renderModal(onClose));

  return onClose;
}

/**
 * Shows a `Modal` component.
 *
 * @template R The modal close result type.
 * @template {Types.Modal.ModalProps<R>} P The properties type.
 * @param {((onClose: () => void) => React.ReactNode) | React.FunctionComponent<P>} renderModal The render function for the modal.
 * @param {P} [props] The properties to pass to the modal {@link React.FunctionComponent Component}.
 * @returns {Promise<R>} The promise that resolves when the modal is closed.
 */
export async function showModalAsync(renderModal, props) {
  return new Promise((resolve) => {
    const onClose = (result) => {
      props?.onClose?.(result);
      resolve(result);
    };

    showModal(renderModal, {
      ...props,
      onClose,
    });
  });
}
