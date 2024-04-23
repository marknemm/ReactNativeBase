import { showModal } from '@util/modal';
import { useEffect, useRef } from 'react';

/**
 * A hook that displays a modal.
 *
 * @param {boolean} isVisible The visibility state of the modal.
 * @param {(onClose: () => void) => React.ReactNode} renderModal The render function for the modal.
 * @returns {() => void} The function to destroy the Backdrop.
 */
export function useModal(isVisible, renderModal) {
  const destroyRef = useRef(() => {});

  useEffect(() => {
    (isVisible)
      ? destroyRef.current = showModal(renderModal)
      : destroyRef.current();

    return destroyRef.current;
  }, [isVisible]);

  return destroyRef.current;
}
