import { StyleProp, ViewStyle } from 'react-native';

/**
 * Backdrop component {@link BackdropProps properties}.
 */
export interface BackdropProps {

  /**
   * Determines whether the backdrop is visible.
   */
  isVisible?: boolean;

  /**
   * Backdrop press event handler.
   */
  onPress?: () => void;

  /**
   * Style for the backdrop container.
   */
  style?: StyleProp<ViewStyle>;

}

/**
 * Backdrop component {@link BackdropState state}.
 */
export interface BackdropState extends Omit<BackdropProps, 'onPress'> {

  /**
   * Sets the {@link BackdropProps.isVisible isVisible} state.
   *
   * @param isVisible Whether the backdrop is visible.
   */
  setIsVisible: (isVisible: boolean) => void;

  /**
   * Backdrop press event listeners.
   */
  pressListeners: ReadonlyArray<(() => void)>;

  /**
   * Sets an {@link BackdropProps.onPress onPress} listener.
   *
   * @param onPress Backdrop press event handler.
   */
  setPressListener: (onPress: () => void) => void;

  /**
   * Sets the {@link BackdropProps.style style} state.
   *
   * @param style Style for the backdrop container.
   */
  setStyle: (style: StyleProp<ViewStyle>) => void;

}
