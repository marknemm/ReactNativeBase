import { StyleProp, ViewStyle } from 'react-native';
import { BaseAnimationBuilder, EntryExitAnimationFunction, FadeIn, FadeOut } from 'react-native-reanimated';

type EntryOrExitLayoutType = BaseAnimationBuilder | typeof BaseAnimationBuilder | EntryExitAnimationFunction;

/**
 * The `Modal` component properties.
 *
 * @template TResult The type of the result of the modal prompt.
 */
export interface Props<TResult = any> {

  /**
   * The {@link ViewStyle} to apply to the `Backdrop`.
   */
  backdropStyle?: StyleProp<ViewStyle>;

  /**
   * The children components to display in the `Modal`.
   */
  children?: React.ReactNode;

  /**
   * The entering animation for the `Modal`. Defaults to {@link FadeIn}.
   *
   * @default FadeIn
   */
  entering?: EntryOrExitLayoutType;

  /**
   * The exiting animation for the `Modal`. Defaults to {@link FadeOut}.
   *
   * @default FadeOut
   */
  exiting?: EntryOrExitLayoutType;

  /**
   * Whether the `Modal` is visible. Defaults to `true`.
   *
   * @default true
   */
  isVisible?: boolean;

  /**
   * Callback invoked when the `Backdrop` is pressed.
   */
  onBackdropPress?: () => void;

  /**
   * Callback invoked when the `Modal` is closed.
   *
   * @param result The result of the modal prompt.
   */
  onClose?: (result?: TResult) => void;

  /**
   * The {@link ViewStyle} to apply to the `Modal`.
   */
  style?: StyleProp<ViewStyle>;

}
