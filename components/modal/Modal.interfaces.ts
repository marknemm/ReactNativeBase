import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { BaseAnimationBuilder, EntryExitAnimationFunction, FadeIn, FadeOut } from 'react-native-reanimated';
import type Modal from './Modal';

type EntryOrExitLayoutType = BaseAnimationBuilder | typeof BaseAnimationBuilder | EntryExitAnimationFunction;

/**
 * The {@link Modal} component properties.
 *
 * @template TResult The type of the result of the modal prompt.
 */
export interface ModalProps<TResult = any> extends PropsWithChildren {

  /**
   * The {@link ViewStyle} to apply to the `Backdrop`.
   */
  backdropStyle?: StyleProp<ViewStyle>;

  /**
   * The entering animation for the {@link Modal}. Defaults to {@link FadeIn}.
   *
   * @default FadeIn
   */
  entering?: EntryOrExitLayoutType;

  /**
   * The exiting animation for the {@link Modal}. Defaults to {@link FadeOut}.
   *
   * @default FadeOut
   */
  exiting?: EntryOrExitLayoutType;

  /**
   * Whether the {@link Modal} is visible. Defaults to `true`.
   *
   * @default true
   */
  isVisible?: boolean;

  /**
   * Callback invoked when the `Backdrop` is pressed.
   */
  onBackdropPress?: () => void;

  /**
   * Callback invoked when the {@link Modal} is closed.
   *
   * @param result The result of the modal prompt.
   */
  onClose?: (result?: TResult) => void;

  /**
   * The {@link ViewStyle} to apply to the {@link Modal}.
   */
  style?: StyleProp<ViewStyle>;

}

/**
 * The {@link Modal} component style properties.
 */
export type ModalStyleProps = Pick<ModalProps, 'style'>;
