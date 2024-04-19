import { BackdropContext } from '@contexts/backdrop/BackdropContext';
import { useCallback, useContext, useEffect } from 'react';

/**
 * A hook that provides the app-wide {@link Types.Backdrop.BackdropState BackdropState}.
 * Also allows setting the Backdrop {@link Types.Backdrop.BackdropProps properties}.
 *
 * @param {Types.Backdrop.BackdropProps} [props] The Backdrop {@link Types.Backdrop.BackdropProps properties}.
 * `Note`: The {@link Types.Backdrop.BackdropProps.onPress onPress} callback property is memoized.
 * @returns {Types.Backdrop.BackdropState} The app-wide {@link Types.Backdrop.BackdropState BackdropState}.
 */
export function useBackdrop({ isVisible, onPress, style } = {}) {
  const backdrop = useContext(BackdropContext);

  // Memoize the onPress callback.
  let onPressCb = useCallback(onPress, []);
  if (!onPress) onPressCb = undefined;

  useEffect(() => {
    if (isVisible !== undefined) backdrop.setIsVisible(isVisible);
    if (style !== undefined)     backdrop.setStyle(style);

    return onPressCb
      ? backdrop.setPressListener(onPressCb)
      : undefined;
  }, [backdrop, isVisible, onPressCb, style]);

  return backdrop;
}
