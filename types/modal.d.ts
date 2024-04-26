import { StyleProp, ViewStyle } from 'react-native';
import { BaseAnimationBuilder, EntryExitAnimationFunction, FadeIn, FadeOut } from 'react-native-reanimated';

type EntryOrExitLayoutType = BaseAnimationBuilder | EntryExitAnimationFunction | IEntryExitAnimationBuilder;

/**
 * The `Backdrop` component properties.
 */
export interface BackdropProps {

  /**
   * Whether the `Backdrop` is visible.
   * Defaults to `true`.
   *
   * @default true
   */
  isVisible?: boolean;

  /**
   * Callback invoked when the `Backdrop` is pressed.
   */
  onPress?: () => void;

  /**
   * The {@link ViewStyle style} to apply to the `Backdrop`.
   */
  style?: StyleProp<ViewStyle>;

}

/**
 * The `Modal` component properties.
 *
 * @template TResult The type of the result of the modal prompt.
 */
export interface ModalProps<TResult = any> {

  /**
   * The {@link ViewStyle style} to apply to the `Backdrop`.
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
   * The {@link ViewStyle style} to apply to the `Modal`.
   */
  style?: StyleProp<ViewStyle>;

}

/**
 * Infers the `TResult` type from a `ModalProps` type's template argument.
 */
export type InferTResult<TProps> = TProps extends ModalProps<infer TResult>
                                 ? TResult
                                 : any;

/**
 * The `Modal` render function type.
 * Takes either a render function or a functional component.
 *
 * - The render function receives a `onClose` callback to close the modal and returns JSX that is to be rendered.
 *
 * - The functional component receives the `ModalProps` and returns JSX that is to be rendered.
 */
export type ModalRenderFn<TProps, TResult> = ((onClose: (result?: TResult) => void) => React.ReactNode)
                                           | React.FunctionComponent<TProps>
