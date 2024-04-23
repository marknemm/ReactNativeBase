import RootSiblingsManager from 'react-native-root-siblings';

/**
 * Shows a modal.
 *
 * @param {(onClose: () => void) => React.ReactNode} renderModal The render function for the modal.
 * @returns {() => void} The function to close the modal.
 */
export function showModal(renderModal) {
  const rootNode = new RootSiblingsManager(renderModal(() =>
    rootNode.destroy()
  ));
  return () => rootNode.destroy();
}
