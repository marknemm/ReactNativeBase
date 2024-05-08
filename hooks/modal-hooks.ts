import { InferTResult, ModalProps, ModalRenderFn } from '@interfaces/modal';
import { showModal } from '@util/modal';
import { useEffect, useRef } from 'react';

/**
 * Custom hook that displays a modal.
 *
 * @template TProps The properties type.
 * @template TResultThe modal close result type.
 * @param isVisible The visibility state of the modal.
 * @param renderModal The render function for the modal.
 * @returns The function to close the modal.
 */
export function useModal<
  TProps extends ModalProps,
  TResult = InferTResult<TProps>
>(
  isVisible: boolean,
  renderModal: ModalRenderFn<TProps, TResult>
): () => void {
  const destroyRef = useRef(() => {});

  useEffect(() => {
    isVisible
      ? destroyRef.current = showModal<TProps, TResult>(renderModal)
      : destroyRef.current();

    return destroyRef.current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return destroyRef.current;
}
