import { InferTResult, ModalProps, ModalRenderFn } from '@interfaces/modal';
import { createElement } from 'react';
import RootSiblingsManager from 'react-native-root-siblings';

/**
 * Shows a `Modal` component.
 *
 * @template TProps The properties type.
 * @template TResultThe modal close result type.
 * @param renderModal The {@link ModalRenderFn}.
 * @param props The properties to pass to the modal {@link React.FunctionComponent Component}.
 * @returns The function to close the modal.
 */
export function showModal<
  TProps extends ModalProps,
  TResult = InferTResult<TProps>
>(
  renderModal: ModalRenderFn<TProps, TResult>,
  props?: TProps
): (result?: TResult) => void {
  let rootNode: RootSiblingsManager;
  const onClose = (result: TResult) => {
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
 * @template TProps The properties type.
 * @template TResult The modal close result type.
 * @param renderModal The {@link ModalRenderFn}.
 * @param props The properties to pass to the modal {@link React.FunctionComponent Component}.
 * @returns The promise that resolves when the modal is closed.
 */
export async function showModalAsync<
  TProps extends ModalProps,
  TResult extends InferTResult<TProps>
>(
  renderModal: ModalRenderFn<TProps, TResult>,
  props?: TProps
): Promise<TResult> {
  return new Promise((resolve) => {
    const onClose = (result: TResult) => {
      props?.onClose?.(result);
      resolve(result);
    };

    showModal(renderModal, {
      ...props,
      onClose,
    });
  });
}
